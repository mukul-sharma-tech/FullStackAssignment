import createApp from './app';
import { PORT } from './utils/config';
import { connectToDatabase } from './utils/db';

const startServer = async () => {
  await connectToDatabase();

  // Call createApp() to get the Express instance
  const app = createApp();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});