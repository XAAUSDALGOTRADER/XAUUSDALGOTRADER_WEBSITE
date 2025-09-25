import { createServiceRoleClient } from '../../../server/lib/supabase-server.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'https://xauusdalgotrader.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const supabase = createServiceRoleClient();

    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);

    const status = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: error ? 'unhealthy' : 'healthy',
      environment: process.env.NODE_ENV || 'development'
    };

    res.status(error ? 503 : 200).json(status);
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
}