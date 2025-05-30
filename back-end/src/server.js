// src/server.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const http = require('http');
const { createAdapter } = require('@socket.io/redis-adapter');
const { createClient } = require('redis');
const { Server } = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Simple REST endpoint
app.get('/', (req, res) => {
  res.send('Annuity Products API running');
});

// Optional: Set up MongoDB connection
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

async function main() {
  const mongoClient = new MongoClient(mongoUrl);
  await mongoClient.connect();
  console.log('Connected to MongoDB');

  const pubClient = createClient({ url: redisUrl });
  const subClient = pubClient.duplicate();

  await Promise.all([pubClient.connect(), subClient.connect()]);
  io.adapter(createAdapter(pubClient, subClient));

  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);
  });

  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

main().catch(console.error);
