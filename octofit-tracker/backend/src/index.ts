import { connectDatabase } from './config/database';
import { startServer } from './server';

async function start(): Promise<void> {
  await connectDatabase();
  startServer();
}

void start().catch((error: unknown) => {
  console.error('Failed to start the OctoFit API:', error);
  process.exitCode = 1;
});
