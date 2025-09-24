export const registrationPendingEmail = (userName, userEmail) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Received - XAU/USD Algo Trader</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            border: 1px solid #e0e0e0;
        }
        .header {
            background: linear-gradient(135deg, #f8d568 0%, #d4af37 100%);
            padding: 30px 20px;
            text-align: center;
        }
        .logo {
            color: #1a1a1a;
            font-size: 32px;
            font-weight: bold;
            margin: 0;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
        }
        .subtitle {
            color: #1a1a1a;
            font-size: 18px;
            margin: 5px 0 0 0;
            opacity: 0.9;
            font-weight: 500;
        }
        .content {
            padding: 40px 30px;
        }
        .greeting {
            color: #1a1a1a;
            font-size: 26px;
            margin-bottom: 25px;
            font-weight: 600;
        }
        .message {
            color: #555;
            font-size: 16px;
            margin-bottom: 20px;
            line-height: 1.7;
        }
        .status-box {
            background: #fff8e6;
            border: 2px solid #f8d568;
            padding: 25px;
            margin: 30px 0;
            border-radius: 8px;
            text-align: center;
        }
        .status-title {
            color: #d4af37;
            font-weight: bold;
            font-size: 20px;
            margin-bottom: 15px;
        }
        .footer {
            background: #1a1a1a;
            color: #fff;
            padding: 30px 20px;
            text-align: center;
        }
        .contact-info {
            margin: 20px 0;
            font-size: 14px;
            line-height: 1.6;
        }
        .social-links {
            margin: 20px 0;
        }
        .social-links a {
            color: #f8d568;
            text-decoration: none;
            margin: 0 12px;
            font-weight: 500;
        }
        .button {
            display: inline-block;
            padding: 14px 35px;
            background: linear-gradient(135deg, #f8d568 0%, #d4af37 100%);
            color: #1a1a1a !important;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            margin: 25px 0;
            font-size: 16px;
            border: none;
            cursor: pointer;
        }
        .info-box {
            background: #f8f9fa;
            border-left: 4px solid #d4af37;
            padding: 20px;
            margin: 25px 0;
            border-radius: 6px;
        }
        @media (max-width: 600px) {
            .content {
                padding: 25px 20px;
            }
            .greeting {
                font-size: 22px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="logo">XAU/USD</h1>
            <p class="subtitle">ALGO TRADER</p>
        </div>
        
        <div class="content">
            <h2 class="greeting">Welcome, ${userName}!</h2>
            
            <p class="message">
                Thank you for registering with <strong>XAU/USD Algo Trader</strong>. 
                We're excited to have you join our community of professional traders!
            </p>
            
            <div class="status-box">
                <h3 class="status-title">🔄 Account Status: Pending Approval</h3>
                <p class="message">
                    Your account registration has been received and is currently under review by our administration team. 
                    This verification process typically takes <strong>24-48 hours</strong>.
                </p>
                <p class="message">
                    Once approved, you'll receive immediate access to our premium trading suite including:
                </p>
                <ul style="text-align: left; color: #555;">
                    <li>Advanced Expert Advisors (EAs)</li>
                    <li>Premium Trading Indicators</li>
                    <li>Real-time Market Signals</li>
                    <li>Exclusive Trading Tools</li>
                </ul>
            </div>
            
            <div class="info-box">
                <p><strong>📧 Registered Email:</strong> ${userEmail}</p>
                <p><strong>⏳ Next Steps:</strong> You'll receive an approval notification email once your account is activated.</p>
            </div>
            
            <p class="message">
                We appreciate your patience during this process. Our team works diligently to ensure 
                the highest security standards for all our members.
            </p>
            
            <center>
                <a href="${process.env.APP_URL}" class="button">Visit Our Platform</a>
            </center>
        </div>
        
        <div class="footer">
            <p style="font-size: 16px; margin-bottom: 20px;">Happy Trading! 📈</p>
            
            <div class="contact-info">
                <p>📧 Support: <a href="mailto:${process.env.SUPPORT_EMAIL}" style="color: #f8d568;">${process.env.SUPPORT_EMAIL}</a></p>
                <p>📞 Phone: ${process.env.SUPPORT_PHONE}</p>
                <p>📍 Bhubaneswar, Odisha - 751003, India</p>
            </div>
            
            <div class="social-links">
                <a href="${process.env.SUPPORT_TELEGRAM}" target="_blank">Telegram Community</a> • 
                <a href="${process.env.SUPPORT_YOUTUBE}" target="_blank">YouTube Channel</a>
            </div>
            
            <p style="font-size: 12px; opacity: 0.8; margin-top: 25px; line-height: 1.5;">
                © 2025 XAUUSD Algo Trader. All rights reserved.<br>
                This is an automated message. Please do not reply to this email.
            </p>
        </div>
    </div>
</body>
</html>
`;

export const accountApprovedEmail = (userName, userEmail) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Approved - XAU/USD Algo Trader</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            border: 1px solid #e0e0e0;
        }
        .header {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            padding: 30px 20px;
            text-align: center;
        }
        .logo {
            color: #ffffff;
            font-size: 32px;
            font-weight: bold;
            margin: 0;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
        }
        .subtitle {
            color: #ffffff;
            font-size: 18px;
            margin: 5px 0 0 0;
            opacity: 0.9;
            font-weight: 500;
        }
        .content {
            padding: 40px 30px;
        }
        .greeting {
            color: #1a1a1a;
            font-size: 26px;
            margin-bottom: 25px;
            font-weight: 600;
        }
        .message {
            color: #555;
            font-size: 16px;
            margin-bottom: 20px;
            line-height: 1.7;
        }
        .status-box {
            background: #e6f7ee;
            border: 2px solid #10b981;
            padding: 25px;
            margin: 30px 0;
            border-radius: 8px;
            text-align: center;
        }
        .status-title {
            color: #059669;
            font-weight: bold;
            font-size: 20px;
            margin-bottom: 15px;
        }
        .footer {
            background: #1a1a1a;
            color: #fff;
            padding: 30px 20px;
            text-align: center;
        }
        .contact-info {
            margin: 20px 0;
            font-size: 14px;
            line-height: 1.6;
        }
        .social-links {
            margin: 20px 0;
        }
        .social-links a {
            color: #10b981;
            text-decoration: none;
            margin: 0 12px;
            font-weight: 500;
        }
        .button {
            display: inline-block;
            padding: 14px 35px;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            margin: 25px 0;
            font-size: 16px;
            border: none;
            cursor: pointer;
        }
        .features-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin: 25px 0;
        }
        .feature-item {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 6px;
            text-align: center;
            border-left: 3px solid #10b981;
        }
        .feature-icon {
            font-size: 24px;
            margin-bottom: 10px;
        }
        @media (max-width: 600px) {
            .content {
                padding: 25px 20px;
            }
            .greeting {
                font-size: 22px;
            }
            .features-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="logo">XAU/USD</h1>
            <p class="subtitle">ALGO TRADER</p>
        </div>
        
        <div class="content">
            <h2 class="greeting">Congratulations, ${userName}! 🎉</h2>
            
            <p class="message">
                Great news! Your account has been <strong>approved</strong> by our administration team. 
                Welcome to the XAU/USD Algo Trader community!
            </p>
            
            <div class="status-box">
                <h3 class="status-title">✅ Account Status: Approved & Active</h3>
                <p class="message">
                    Your account is now fully activated and ready to use. You can access all our premium 
                    trading tools and resources immediately.
                </p>
            </div>

            <h3 style="color: #1a1a1a; margin-bottom: 20px; text-align: center;">🎯 What You Can Access Now:</h3>
            
            <div class="features-grid">
                <div class="feature-item">
                    <div class="feature-icon">🤖</div>
                    <strong>Expert Advisors</strong>
                    <p>Advanced trading robots</p>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">📊</div>
                    <strong>Premium Indicators</strong>
                    <p>Real-time market analysis</p>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">⚡</div>
                    <strong>Live Signals</strong>
                    <p>Professional trading signals</p>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">🛡️</div>
                    <strong>Risk Management</strong>
                    <p>Advanced protection tools</p>
                </div>
            </div>
            
            <p class="message">
                Log in to your account to start exploring our comprehensive suite of trading resources 
                designed to help you achieve consistent profitability.
            </p>
            
            <center>
                <a href="${process.env.APP_URL}/login" class="button">Login to Your Account</a>
            </center>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; margin: 25px 0;">
                <p style="margin: 0; color: #555; text-align: center;">
                    <strong>📧 Registered Email:</strong> ${userEmail}<br>
                    <strong>🚀 Next Steps:</strong> Explore our platform and join our trading community
                </p>
            </div>
        </div>
        
        <div class="footer">
            <p style="font-size: 16px; margin-bottom: 20px;">Happy Trading! 📈</p>
            
            <div class="contact-info">
                <p>📧 Support: <a href="mailto:${process.env.SUPPORT_EMAIL}" style="color: #10b981;">${process.env.SUPPORT_EMAIL}</a></p>
                <p>📞 Phone: ${process.env.SUPPORT_PHONE}</p>
                <p>📍 Bhubaneswar, Odisha - 751003, India</p>
            </div>
            
            <div class="social-links">
                <a href="${process.env.SUPPORT_TELEGRAM}" target="_blank">Telegram Community</a> • 
                <a href="${process.env.SUPPORT_YOUTUBE}" target="_blank">YouTube Channel</a>
            </div>
            
            <p style="font-size: 12px; opacity: 0.8; margin-top: 25px; line-height: 1.5;">
                © 2025 XAUUSD Algo Trader. All rights reserved.<br>
                This is an automated message. Please do not reply to this email.
            </p>
        </div>
    </div>
</body>
</html>
`;

export const accountRejectedEmail = (userName, userEmail, reason = '') => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Review Update - XAU/USD Algo Trader</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            border: 1px solid #e0e0e0;
        }
        .header {
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
            padding: 30px 20px;
            text-align: center;
        }
        .logo {
            color: #ffffff;
            font-size: 32px;
            font-weight: bold;
            margin: 0;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
        }
        .subtitle {
            color: #ffffff;
            font-size: 18px;
            margin: 5px 0 0 0;
            opacity: 0.9;
            font-weight: 500;
        }
        .content {
            padding: 40px 30px;
        }
        .greeting {
            color: #1a1a1a;
            font-size: 26px;
            margin-bottom: 25px;
            font-weight: 600;
        }
        .message {
            color: #555;
            font-size: 16px;
            margin-bottom: 20px;
            line-height: 1.7;
        }
        .status-box {
            background: #feeaea;
            border: 2px solid #ef4444;
            padding: 25px;
            margin: 30px 0;
            border-radius: 8px;
            text-align: center;
        }
        .status-title {
            color: #dc2626;
            font-weight: bold;
            font-size: 20px;
            margin-bottom: 15px;
        }
        .footer {
            background: #1a1a1a;
            color: #fff;
            padding: 30px 20px;
            text-align: center;
        }
        .contact-info {
            margin: 20px 0;
            font-size: 14px;
            line-height: 1.6;
        }
        .social-links {
            margin: 20px 0;
        }
        .social-links a {
            color: #ef4444;
            text-decoration: none;
            margin: 0 12px;
            font-weight: 500;
        }
        .button {
            display: inline-block;
            padding: 14px 35px;
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            margin: 25px 0;
            font-size: 16px;
            border: none;
            cursor: pointer;
        }
        .reason-box {
            background: #fef2f2;
            border-left: 4px solid #ef4444;
            padding: 20px;
            margin: 25px 0;
            border-radius: 6px;
        }
        @media (max-width: 600px) {
            .content {
                padding: 25px 20px;
            }
            .greeting {
                font-size: 22px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="logo">XAU/USD</h1>
            <p class="subtitle">ALGO TRADER</p>
        </div>
        
        <div class="content">
            <h2 class="greeting">Account Review Update</h2>
            
            <p class="message">
                We've completed the review of your registration application for 
                <strong>XAU/USD Algo Trader</strong>.
            </p>
            
            <div class="status-box">
                <h3 class="status-title">❌ Account Status: Not Approved</h3>
                <p class="message">
                    Unfortunately, we cannot approve your account at this time. Our administration team 
                    has reviewed your application and determined that it doesn't meet our current criteria.
                </p>
            </div>

            ${reason ? `
            <div class="reason-box">
                <h4 style="color: #dc2626; margin-bottom: 10px;">📋 Reason for Decision:</h4>
                <p style="color: #555; margin: 0;">${reason}</p>
            </div>
            ` : ''}
            
            <p class="message">
                If you believe this decision was made in error or would like more information, 
                please don't hesitate to contact our support team for further assistance.
            </p>
            
            <p class="message">
                We appreciate your interest in XAU/USD Algo Trader and thank you for your understanding.
            </p>
            
            <center>
                <a href="mailto:${process.env.SUPPORT_EMAIL}" class="button">Contact Support</a>
            </center>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; margin: 25px 0;">
                <p style="margin: 0; color: #555; text-align: center;">
                    <strong>📧 Registered Email:</strong> ${userEmail}<br>
                    <strong>🕒 Review Date:</strong> ${new Date().toLocaleDateString()}
                </p>
            </div>
        </div>
        
        <div class="footer">
            <p style="font-size: 16px; margin-bottom: 20px;">Thank you for your interest</p>
            
            <div class="contact-info">
                <p>📧 Support: <a href="mailto:${process.env.SUPPORT_EMAIL}" style="color: #ef4444;">${process.env.SUPPORT_EMAIL}</a></p>
                <p>📞 Phone: ${process.env.SUPPORT_PHONE}</p>
                <p>📍 Bhubaneswar, Odisha - 751003, India</p>
            </div>
            
            <div class="social-links">
                <a href="${process.env.SUPPORT_TELEGRAM}" target="_blank">Telegram Community</a> • 
                <a href="${process.env.SUPPORT_YOUTUBE}" target="_blank">YouTube Channel</a>
            </div>
            
            <p style="font-size: 12px; opacity: 0.8; margin-top: 25px; line-height: 1.5;">
                © 2025 XAUUSD Algo Trader. All rights reserved.<br>
                This is an automated message. Please do not reply to this email.
            </p>
        </div>
    </div>
</body>
</html>
`;

export const contactFormEmail = (name, email, phone, message) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px; }
        .header { background: linear-gradient(135deg, #f8d568 0%, #d4af37 100%); padding: 20px; text-align: center; }
        .content { background: white; padding: 30px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 15px; padding: 10px; background: #f8f9fa; border-radius: 4px; }
        .field strong { color: #1a1a1a; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2 style="color: #1a1a1a; margin: 0;">XAU/USD ALGO TRADER</h2>
            <p style="color: #1a1a1a; margin: 5px 0 0 0;">New Contact Form Submission</p>
        </div>
        <div class="content">
            <div class="field"><strong>Name:</strong> ${name}</div>
            <div class="field"><strong>Email:</strong> ${email}</div>
            <div class="field"><strong>Phone:</strong> ${phone || 'Not provided'}</div>
            <div class="field"><strong>Message:</strong><br>${message}</div>
            <div class="field"><strong>Submitted:</strong> ${new Date().toLocaleString()}</div>
        </div>
    </div>
</body>
</html>
`;