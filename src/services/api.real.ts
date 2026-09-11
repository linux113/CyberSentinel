// REAL API implementation - uncomment and use when backend is running
// This file shows how frontend connects to real backend (Node.js + Express + MongoDB + Suricata)

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const WS_URL = import.meta.env.VITE_WS_URL || 'http://localhost:3000';

// Example real implementation:
/*
export async function getAlerts(filters) {
  const params = new URLSearchParams();
  if (filters?.severity) params.set('severity', filters.severity);
  if (filters?.status) params.set('status', filters.status);
  if (filters?.search) params.set('search', filters.search);
  const res = await fetch(`${API_URL}/alerts?${params}`);
  if (!res.ok) throw new Error('Failed to fetch alerts');
  return res.json();
}

export async function getDashboardStats() {
  const res = await fetch(`${API_URL}/dashboard/stats`);
  return res.json();
}

export async function analyzeAlert(id) {
  const res = await fetch(`${API_URL}/ai/analyze/${id}`, { method: 'POST' });
  return res.json();
}

// Real-time with Socket.IO
import { io } from 'socket.io-client';
const socket = io(WS_URL);

export function subscribeRealTime(cb) {
  socket.on('new-alert', (data) => cb('new-alert', data));
  socket.on('new-event', (data) => cb('new-event', data));
  socket.on('score-update', (data) => cb('score-update', data));
  return () => {
    socket.off('new-alert');
    socket.off('new-event');
    socket.off('score-update');
  };
}
*/

// For now, re-export mock implementation
export * from './api';
