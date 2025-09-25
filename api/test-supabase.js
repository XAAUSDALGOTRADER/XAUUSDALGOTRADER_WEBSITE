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
      .select('id, email, name')
      .limit(5);

    if (error) {
      throw error;
    }

    res.status(200).json({
      success: true,
      message: 'Supabase connection successful',
      data: data || [],
      config: {
        url: process.env.SUPABASE_URL ? 'Set' : 'Missing',
        serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Set' : 'Missing'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Supabase connection failed',
      error: error.message
    });
  }
}