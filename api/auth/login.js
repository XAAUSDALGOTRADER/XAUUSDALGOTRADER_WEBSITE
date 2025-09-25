import { createServiceRoleClient } from '../../../server/lib/supabase-server.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  // Set CORS headers for production
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'https://yourdomain.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Validate JWT_SECRET environment variable
  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET environment variable is not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const supabase = createServiceRoleClient();

    // Find user with error handling
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email.toLowerCase().trim())
      .single();

    if (userError) {
      if (userError.code === 'PGRST116') {
        // User not found
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      console.error('Database error during login:', userError);
      return res.status(500).json({ error: 'Database error' });
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if user is approved
    if (user.status !== 'approved') {
      return res.status(403).json({ 
        error: 'Account pending approval. Please wait for admin approval.' 
      });
    }

    // Check password with timing-safe comparison
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    await supabase
      .from('users')
      .update({ 
        last_login: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    // Generate token with secure settings
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        name: user.name,
        isAdmin: false 
      }, 
      process.env.JWT_SECRET, 
      { 
        expiresIn: '24h',
        issuer: 'xauusd-algo-trader',
        audience: 'xauusd-algo-trader-users'
      }
    );

    // Secure cookie settings for production
    res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=86400`);

    // Return success response without sensitive data
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        country: user.country,
        mobile: user.mobile,
        status: user.status,
        last_login: user.last_login
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    
    // Don't expose internal error details in production
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? error.message 
      : 'Internal server error';
    
    res.status(500).json({ error: errorMessage });
  }
}