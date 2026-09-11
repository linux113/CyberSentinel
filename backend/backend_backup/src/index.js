import 'dotenv/config';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import mongoose from 'mongoose';
import { startEveWatcher } from './services/eveWatcher.js';
import { setupRoutes } from './routes/index.js';
import { seedDatabase } from './services/seed.js';

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cybersentinel';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [FRONTEND_URL, 'http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST']
  }
});

app.use(cors({ origin: '*' }));
app.use(express.json());

// Make io available in routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Health
app.get('/health', (req, res) => {
  res.json({ status: 'OPERATIONAL', timestamp: new Date().toISOString(), eveMode: process.env.EVE_MODE || 'real', mongo: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

setupRoutes(app);

io.on('connection', (socket) => {
  console.log(`[Socket.IO] Client connected: ${socket.id}`);
  socket.emit('connected', { message: 'Connected to CyberSentinel real-time feed', timestamp: new Date().toISOString() });
  socket.on('disconnect', () => console.log(`[Socket.IO] Client disconnected: ${socket.id}`));
});

async function start() {
  try {
    console.log('[CyberSentinel Backend] Starting...');
    console.log(`[Config] PORT=${PORT} MONGO_URI=${MONGO_URI} EVE_MODE=${process.env.EVE_MODE} EVE_PATH=${process.env.EVE_JSON_PATH}`);

    // MongoDB
    try {
      await mongoose.connect(MONGO_URI);
      console.log('[MongoDB] Connected to', MONGO_URI);
      if (process.env.SEED_DB === 'true') {
        await seedDatabase();
      }
    } catch (err) {
      console.warn('[MongoDB] Connection failed, running in memory mode (no persistence):', err.message);
      console.warn('Install MongoDB or set MONGO_URI to enable persistence. API will still work with in-memory store.');
    }

    // Start EVE watcher (Suricata real-time)
    startEveWatcher(io);

    server.listen(PORT, '0.0.0.0', () => {
      console.log(`[Backend] Listening on http://0.0.0.0:${PORT}`);
      console.log(`[API] http://localhost:${PORT}/api/dashboard/stats`);
      console.log(`[Health] http://localhost:${PORT}/health`);
      console.log(`[Socket.IO] Real-time feed ready`);
      console.log(`\n--- Real Data Flow ---`);
      console.log(`Kali → Suricata (eve.json) → EVE Parser → MongoDB → Socket.IO → Frontend`);
      console.log(`Frontend should set VITE_API_URL=http://localhost:${PORT}/api`);
    });
  } catch (err) {
    console.error('[Fatal] Failed to start:', err);
    process.exit(1);
  }
}

start();
