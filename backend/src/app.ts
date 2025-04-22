import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import userRoutes from './routes/user.routes';

const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(json());

  // Routes
  app.use('/api/users', userRoutes);

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  return app;
};

export default createApp;