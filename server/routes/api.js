import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { createServiceRoleClient } from '../lib/supabase-server.js';
import { emailQueue } from '../lib/emailQueue.js';
import { 
  registrationPendingEmail, 
  accountApprovedEmail, 
  accountRejectedEmail 
} from '../emails/templates.js';
import premiumRequestRoutes from './premium-request.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
import contactRoutes from './contact.js';

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, admin) => {
    if (err || !admin.isAdmin) {
      return res.status(403).json({ error: 'Admin access required' });
    }
    req.admin = admin;
    next();
  });
};

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Test Supabase connection
router.get('/test-supabase', async (req, res) => {
  try {
    const supabase = createServiceRoleClient();
    const { data, error } = await supabase.from('admins').select('count');
    
    if (error) {
      console.error('Supabase test error:', error);
      return res.status(500).json({ error: 'Supabase connection failed', details: error });
    }
    
    res.json({ message: 'Supabase connected successfully', data });
  } catch (error) {
    console.error('Supabase test exception:', error);
    res.status(500).json({ error: 'Supabase test failed', details: error.message });
  }
});

// User registration
router.post('/register', async (req, res) => {
  try {
    console.log('Registration attempt:', req.body);
    const { name, email, password, country, mobile } = req.body;
    const supabase = createServiceRoleClient();

    // Validation
    if (!name || !email || !password || !country || !mobile) {
      console.log('Missing fields');
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }
    
    // Check if user already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Check error:', checkError);
      return res.status(500).json({ error: 'Database error' });
    }

    if (existingUser) {
      console.log('User already exists');
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Creating user with hashed password');
    
    // Create user
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert([
        {
          name,
          email,
          password: hashedPassword,
          country,
          mobile,
          status: 'pending'
        }
      ])
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      return res.status(500).json({ error: 'Failed to create user' });
    }
    // Add email to queue (non-blocking)
    emailQueue.addToQueue({
      to: email,
      subject: 'Registration Received - XAU/USD Algo Trader',
      html: registrationPendingEmail(name, email)
    });
    
    console.log('User created successfully:', newUser.id);

    res.status(201).json({ 
      message: 'Registration successful. Waiting for admin approval.',
      userId: newUser.id 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Proper admin creation endpoint (keep this)
router.post('/admin/create', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const supabase = createServiceRoleClient();

    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    // Check if admin already exists
    const { data: existingAdmin } = await supabase
      .from('admins')
      .select('id')
      .eq('email', email)
      .single();

    if (existingAdmin) {
      return res.status(409).json({ error: 'Admin already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const { data: newAdmin, error: createError } = await supabase
      .from('admins')
      .insert([{ email, password: hashedPassword, name }])
      .select()
      .single();

    if (createError) {
      console.error('Admin creation error:', createError);
      return res.status(500).json({ error: 'Failed to create admin' });
    }

    res.json({ message: 'Admin created successfully', admin: newAdmin });
  } catch (error) {
    console.error('Admin creation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    console.log('Login attempt:', req.body.email);
    const { email, password } = req.body;
    const supabase = createServiceRoleClient();

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (userError) {
      console.error('User find error:', userError);
      return res.status(401).json({ error: 'Invalid credentials' });
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

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    await supabase
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', user.id);

    // Generate token
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        name: user.name,
        isAdmin: false 
      }, 
      JWT_SECRET, 
      { expiresIn: '24h' }
    );

    console.log('Login successful for user:', user.email);
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        country: user.country,
        mobile: user.mobile
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin login
router.post('/admin/login', async (req, res) => {
  try {
    console.log('Admin login attempt:', req.body);
    const { email, password } = req.body;
    const supabase = createServiceRoleClient();

    if (!email || !password) {
      console.log('Missing email or password');
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find admin
    const { data: admin, error: adminError } = await supabase
      .from('admins')
      .select('*')
      .eq('email', email)
      .single();

    console.log('Admin query result:', { admin, adminError });

    if (adminError) {
      console.error('Admin find error:', adminError);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (!admin) {
      console.log('No admin found with email:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    console.log('Comparing password...');
    const validPassword = await bcrypt.compare(password, admin.password);
    console.log('Password comparison result:', validPassword);

    if (!validPassword) {
      console.log('Invalid password for admin:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { 
        id: admin.id, 
        email: admin.email, 
        name: admin.name,
        isAdmin: true 
      }, 
      JWT_SECRET, 
      { expiresIn: '24h' }
    );

    console.log('Admin login successful:', admin.email);
    res.json({
      message: 'Admin login successful',
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Utility route to hash all existing admin passwords (run once)
// router.post('/admin/hash-passwords', async (req, res) => {
//   try {
//     const supabase = createServiceRoleClient();
    
//     // Get all admins with raw passwords
//     const { data: admins, error: fetchError } = await supabase
//       .from('admins')
//       .select('*');

//     if (fetchError) {
//       console.error('Error fetching admins:', fetchError);
//       return res.status(500).json({ error: 'Failed to fetch admins' });
//     }

//     console.log('Found admins:', admins);

//     // Hash each password and update the database
//     for (const admin of admins) {
//       // Check if password is already hashed (bcrypt hashes start with $2b$)
//       if (admin.password && !admin.password.startsWith('$2b$')) {
//         console.log('Hashing password for:', admin.email);
//         const hashedPassword = await bcrypt.hash(admin.password, 10);
        
//         // Update the admin with hashed password
//         const { error: updateError } = await supabase
//           .from('admins')
//           .update({ password: hashedPassword })
//           .eq('id', admin.id);

//         if (updateError) {
//           console.error('Error updating admin:', updateError);
//         } else {
//           console.log('Successfully hashed password for:', admin.email);
//         }
//       } else {
//         console.log('Password already hashed for:', admin.email);
//       }
//     }

//     res.json({ message: 'Password hashing completed', admins });
//   } catch (error) {
//     console.error('Password hashing error:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// Get pending users (admin only)
router.get('/admin/pending-users', authenticateAdmin, async (req, res) => {
  try {
    const supabase = createServiceRoleClient();
    const { data: users, error } = await supabase
      .from('users')
      .select('id, name, email, country, mobile, created_at')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Pending users error:', error);
      return res.status(500).json({ error: 'Database error' });
    }

    res.json({ users });
  } catch (error) {
    console.error('Pending users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all users (admin only)
router.get('/admin/users', authenticateAdmin, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const supabase = createServiceRoleClient();
    const offset = (page - 1) * limit;

    let query = supabase
      .from('users')
      .select(`
        id, name, email, country, mobile, 
        status, created_at, last_login,
        approved_by:admins(name),
        approved_at
      `, { count: 'exact' });

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    const { data: users, error, count } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Get users error:', error);
      return res.status(500).json({ error: 'Database error' });
    }

    res.json({
      users: users.map(user => ({
        ...user,
        approved_by_name: user.approved_by?.name
      })),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Approve user (admin only)
router.post('/admin/users/:id/approve', authenticateAdmin, async (req, res) => {
  try {
    const userId = req.params.id;
    const { reason } = req.body;
    const adminId = req.admin.id;
    const supabase = createServiceRoleClient();

    const { data: user, error: updateError } = await supabase
      .from('users')
      .update({
        status: 'approved',
        approved_by: adminId,
        approved_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single();

    if (updateError) {
      console.error('Approve user error:', updateError);
      return res.status(500).json({ error: 'Database error' });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Record approval history
    await supabase
      .from('user_approval_history')
      .insert({
        user_id: userId,
        admin_id: adminId,
        action: 'approved',
        reason: reason || 'Account approved'
      });

    // Send approval email
    emailQueue.addToQueue({
      to: user.email,
      subject: 'Account Approved - XAU/USD Algo Trader',
      html: accountApprovedEmail(user.name)
    });

    console.log('User approved:', userId);
    res.json({ message: 'User approved successfully' });
  } catch (error) {
    console.error('Approve user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Reject user (admin only)
router.post('/admin/users/:id/reject', authenticateAdmin, async (req, res) => {
  try {
    const userId = req.params.id;
    const { reason } = req.body;
    const adminId = req.admin.id;
    const supabase = createServiceRoleClient();

    const { data: user, error: updateError } = await supabase
      .from('users')
      .update({ status: 'rejected' })
      .eq('id', userId)
      .select()
      .single();

    if (updateError) {
      console.error('Reject user error:', updateError);
      return res.status(500).json({ error: 'Database error' });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Record rejection history
    await supabase
      .from('user_approval_history')
      .insert({
        user_id: userId,
        admin_id: adminId,
        action: 'rejected',
        reason: reason || 'Account rejected'
      });
    
    // Send rejection email
    emailQueue.addToQueue({
      to: user.email,
      subject: 'Account Review Update - XAU/USD Algo Trader',
      html: accountRejectedEmail(user.name, reason)
    });
    
    console.log('User rejected:', userId);
    res.json({ message: 'User rejected successfully' });
  } catch (error) {
    console.error('Reject user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Suspend user (admin only)
router.post('/admin/users/:id/suspend', authenticateAdmin, async (req, res) => {
  try {
    const userId = req.params.id;
    const { reason } = req.body;
    const adminId = req.admin.id;
    const supabase = createServiceRoleClient();

    const { data: user, error: updateError } = await supabase
      .from('users')
      .update({ status: 'suspended' })
      .eq('id', userId)
      .select()
      .single();

    if (updateError) {
      console.error('Suspend user error:', updateError);
      return res.status(500).json({ error: 'Database error' });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Record suspension history
    await supabase
      .from('user_approval_history')
      .insert({
        user_id: userId,
        admin_id: adminId,
        action: 'suspended',
        reason: reason || 'Account suspended'
      });

    console.log('User suspended:', userId);
    res.json({ message: 'User suspended successfully' });
  } catch (error) {
    console.error('Suspend user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user approval history (admin only)
router.get('/admin/users/:id/history', authenticateAdmin, async (req, res) => {
  try {
    const userId = req.params.id;
    const supabase = createServiceRoleClient();

    const { data: history, error } = await supabase
      .from('user_approval_history')
      .select(`
        action,
        reason,
        created_at,
        admin:admins(name, email)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('User history error:', error);
      return res.status(500).json({ error: 'Database error' });
    }

    res.json({
      history: history.map(record => ({
        action: record.action,
        reason: record.reason,
        created_at: record.created_at,
        admin_name: record.admin?.name,
        admin_email: record.admin?.email
      }))
    });
  } catch (error) {
    console.error('User history error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get subscription plans
router.get('/subscription-plans', async (req, res) => {
  try {
    const supabase = createServiceRoleClient();
    const { data: plans, error } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('is_active', true)
      .order('price', { ascending: true });

    if (error) {
      console.error('Subscription plans error:', error);
      return res.status(500).json({ error: 'Database error' });
    }

    res.json({
      plans: plans.map(plan => ({
        ...plan,
        features: JSON.parse(plan.features)
      }))
    });
  } catch (error) {
    console.error('Subscription plans error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create subscription (user only)
router.post('/subscriptions', authenticateToken, async (req, res) => {
  try {
    const { planId, paymentMethod } = req.body;
    const userId = req.user.id;
    const supabase = createServiceRoleClient();

    // Get plan details
    const { data: plan, error: planError } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('id', planId)
      .single();

    if (planError) {
      console.error('Plan error:', planError);
      return res.status(500).json({ error: 'Database error' });
    }

    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }

    // Calculate end date based on duration
    let endDate = new Date();
    const duration = parseInt(plan.duration);
    const unit = plan.duration.replace(/[0-9]/g, '').trim().toLowerCase();
    
    if (unit.includes('month')) {
      endDate.setMonth(endDate.getMonth() + duration);
    } else if (unit.includes('year')) {
      endDate.setFullYear(endDate.getFullYear() + duration);
    } else {
      endDate.setDate(endDate.getDate() + duration);
    }

    // Create subscription
    const { data: subscription, error: subError } = await supabase
      .from('user_subscriptions')
      .insert({
        user_id: userId,
        plan_id: planId,
        start_date: new Date().toISOString(),
        end_date: endDate.toISOString(),
        status: 'active'
      })
      .select()
      .single();

    if (subError) {
      console.error('Subscription error:', subError);
      return res.status(500).json({ error: 'Database error' });
    }

    res.json({ 
      message: 'Subscription created successfully',
      subscriptionId: subscription.id,
      endDate: endDate.toISOString()
    });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user subscriptions
router.get('/user/subscriptions', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const supabase = createServiceRoleClient();

    const { data: subscriptions, error } = await supabase
      .from('user_subscriptions')
      .select(`
        *,
        plan:subscription_plans(name, price, duration)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('User subscriptions error:', error);
      return res.status(500).json({ error: 'Database error' });
    }

    res.json({ 
      subscriptions: subscriptions.map(sub => ({
        ...sub,
        plan_name: sub.plan?.name,
        price: sub.plan?.price,
        duration: sub.plan?.duration
      }))
    });
  } catch (error) {
    console.error('User subscriptions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user profile
router.get('/user/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const supabase = createServiceRoleClient();

    const { data: user, error } = await supabase
      .from('users')
      .select('id, name, email, country, mobile, status, created_at, last_login, approved_at')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('User profile error:', error);
      return res.status(500).json({ error: 'Database error' });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('User profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user profile
router.put('/user/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, country, mobile } = req.body;
    const supabase = createServiceRoleClient();

    // Validate input
    if (!name || !country || !mobile) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Update user in database
    const { data: updatedUser, error } = await supabase
      .from('users')
      .update({ 
        name, 
        country, 
        mobile,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select('id, name, email, country, mobile, status, created_at, last_login, approved_at')
      .single();

    if (error) {
      console.error('Profile update error:', error);
      return res.status(500).json({ error: 'Failed to update profile' });
    }

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: updatedUser });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Redirect to trading platform (after approval)
router.get('/trading-platform', authenticateToken, (req, res) => {
  res.json({ 
    message: 'Redirecting to trading platform',
    redirectUrl: 'https://your-trading-platform.com/auth',
    authToken: 'generated-auth-token-' + Date.now()
  });
});

router.use('/contact', contactRoutes);
router.use('/premium-request', premiumRequestRoutes);

export default router;