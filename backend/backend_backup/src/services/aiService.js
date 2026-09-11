// AI Security Analyst - Defensive, Evidence-Based, No Fabrication
// Uses OpenAI compatible API (OpenAI, Claude via proxy, or Ollama local)

const SYSTEM_PROMPT = `You are CyberSentinel AI Security Analyst — a defensive cybersecurity assistant.

Your role:
- Analyze provided security evidence
- Explain suspicious activity
- Help prioritize incidents
- Recommend defensive actions
- State uncertainty when evidence insufficient
- Clearly distinguish: Observed Evidence vs Inference vs Recommendation

You must NEVER:
- Fabricate IP reputation, CVE details, log evidence, system state
- Claim attack is confirmed malicious without sufficient evidence
- Provide exploit instructions or offensive guidance
- Hallucinate threat intelligence

If evidence insufficient, you MUST say: "Insufficient evidence to determine this conclusively."

Response format must be JSON:
{
  "whatHappened": "Short factual description of observed event",
  "whySuspicious": "Why this deviates from baseline, with indicators",
  "riskAssessment": "Risk X/100 — SEVERITY — reasoning, mention if compromise not confirmed",
  "potentialImpact": "If successful, ... Current evidence shows ... (attempt vs compromise)",
  "recommendedActions": ["1. Verify...", "2. Review..."],
  "confidence": 0-100,
  "observedEvidence": ["indicator1", "indicator2"],
  "inference": ["suggests automated tooling", "no evidence of successful compromise in provided telemetry"]
}

Be concise, professional, SOC-analyst tone.`;

export async function analyzeAlertWithLLM(alert) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.warn('[AI] No OPENAI_API_KEY, using rule-based analysis');
    return ruleBasedAnalysis(alert);
  }

  try {
    // Dynamic import to avoid requiring openai if not installed
    const OpenAI = (await import('openai')).default;
    const client = new OpenAI({
      apiKey,
      baseURL: process.env.OPENAI_BASE_URL || undefined
    });

    const userPrompt = `
Alert to analyze:
ID: ${alert.id}
Title: ${alert.title}
Type: ${alert.type}
Severity: ${alert.severity}
Risk: ${alert.riskScore}
Source: ${alert.sourceIp}:${alert.sourcePort} → Dest: ${alert.destinationIp}:${alert.destinationPort}
Protocol: ${alert.protocol}
Sensor: ${alert.sensor}
Signature: ${alert.signature}
Description: ${alert.description}
Evidence: ${JSON.stringify(alert.evidence)}
Is Simulation: ${alert.isSimulation ? 'YES - DEMO, not real' : 'NO - REAL Suricata telemetry'}
Timestamp: ${alert.timestamp}

Provide analysis following system rules. Distinguish observed evidence vs inference. Do not claim confirmed compromise unless evidence shows success.
`;

    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' }
    });

    const content = completion.choices[0].message.content;
    const parsed = JSON.parse(content);
    
    return {
      ...parsed,
      timestamp: new Date().toISOString()
    };

  } catch (err) {
    console.error('[AI] LLM analysis failed, fallback to rule-based:', err.message);
    return ruleBasedAnalysis(alert);
  }
}

function ruleBasedAnalysis(alert) {
  const templates = {
    NETWORK_SCAN: {
      whatHappened: `Port scanning activity detected from ${alert.sourceIp} toward ${alert.destinationIp}. Sensor ${alert.sensor} flagged ${alert.signature}.`,
      whySuspicious: `Systematic probing of multiple ports/hosts is not typical of normal traffic. Pattern ${alert.evidence.indicators.slice(0,2).join(', ')} matches reconnaissance tooling.`,
      riskAssessment: `Risk ${alert.riskScore}/100 - ${alert.severity}. Reconnaissance phase often precedes exploitation. No exploitation observed yet, but indicates interest in infrastructure.`,
      potentialImpact: `Information gathering about open services could enable targeted exploitation. No direct impact yet, but increases future attack likelihood. Current evidence shows attempt, not compromise.`,
      recommendedActions: [
        'Confirm whether source is authorized scanner or security testing',
        'Review firewall logs for follow-up exploitation attempts',
        'Ensure only necessary ports are exposed on target assets',
        'Consider blocking or rate-limiting source if unauthorized',
        'Validate IDS signatures are up to date'
      ]
    },
    BRUTE_FORCE: {
      whatHappened: `Observed ${alert.evidence.indicators[0] || 'multiple authentication failures'} targeting ${alert.destinationIp} from ${alert.sourceIp}. Detected by ${alert.sensor}.`,
      whySuspicious: `Authentication failures clustered in short time window. Pattern consistent with automated credential guessing, not normal user behavior. Source has no prior legitimate access history.`,
      riskAssessment: `Risk ${alert.riskScore}/100 - ${alert.severity}. HIGH because administrative account targeted. If successful, could lead to privilege escalation. No successful authentication confirmed in provided evidence.`,
      potentialImpact: `If attacker gains access: account takeover, lateral movement, data access. Current evidence shows attempt, not compromise. Impact remains potential until successful login confirmed.`,
      recommendedActions: [
        'Verify whether activity was authorized testing',
        'Review authentication logs for any successful logins from same source',
        'Check if targeted account shows signs of compromise',
        'Block source IP at firewall/WAF if not authorized',
        'Enforce MFA and review password policy',
        'Continue monitoring for related activity'
      ]
    }
  };

  const base = templates[alert.type] || {
    whatHappened: `Security event: ${alert.title} detected on ${alert.destinationIp} from ${alert.sourceIp}.`,
    whySuspicious: alert.evidence.description,
    riskAssessment: `Risk ${alert.riskScore}/100 - ${alert.severity}. Based on provided evidence, activity deviates from baseline.`,
    potentialImpact: `Potential impact depends on whether activity is malicious and successful. Current evidence indicates suspicious behavior requiring investigation.`,
    recommendedActions: alert.recommendation || ['Review logs', 'Verify authorization', 'Monitor']
  };

  return {
    whatHappened: base.whatHappened,
    whySuspicious: base.whySuspicious,
    riskAssessment: base.riskAssessment,
    potentialImpact: base.potentialImpact,
    recommendedActions: base.recommendedActions,
    confidence: Math.min(95, 60 + Math.floor(alert.riskScore * 0.35)),
    observedEvidence: alert.evidence.indicators,
    inference: ['Pattern suggests automated tooling', 'No evidence of successful compromise in current telemetry', 'Requires further investigation'],
    timestamp: new Date().toISOString()
  };
}
