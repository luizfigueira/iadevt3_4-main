import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/plans', (req: Request, res: Response) => {
  try {
    console.log('[API] GET /api/plans requested');
    const plansPath = path.join(__dirname, 'data', 'plans.json');
    const plansData = fs.readFileSync(plansPath, 'utf-8');
    const plans = JSON.parse(plansData);
    console.log(`[API] Returning ${plans.length} plans`);
    res.json(plans);
  } catch (error: any) {
    console.error('[API] Error loading plans:', error);
    res.status(500).json({ 
      error: 'Failed to load plans data',
      message: error.message 
    });
  }
});

app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});