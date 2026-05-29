// نظام المصادقة الآمن
// Serverless Auth Function

import crypto from 'crypto';

// بيانات آمنة (يجب نقلها لقاعدة بيانات حقيقية لاحقاً)
const validCredentials = {
  username: process.env.AUTH_USERNAME || 'admin',
  passwordHash: process.env.AUTH_PASSWORD_HASH || hashPassword('admin123')
};

// دالة لتشفير كلمة المرور
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// دالة لتوليد Token
function generateToken(username) {
  const payload = {
    username,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 ساعات
  };
  
  const secret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64');
  
  return `${header}.${body}`;
}

// دالة التحقق من Token
function verifyToken(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
    
    // التحقق من الصلاحية
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    
    return payload;
  } catch (error) {
    return null;
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { action, username, password, token } = req.body;

    // تسجيل الدخول
    if (action === 'login') {
      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required' });
      }

      const passwordHash = hashPassword(password);

      if (username === validCredentials.username && 
          passwordHash === validCredentials.passwordHash) {
        
        const newToken = generateToken(username);
        return res.status(200).json({
          success: true,
          token: newToken,
          message: 'تم تسجيل الدخول بنجاح'
        });
      }

      return res.status(401).json({ error: 'بيانات دخول غير صحيحة' });
    }

    // التحقق من Token
    if (action === 'verify') {
      if (!token) {
        return res.status(400).json({ error: 'Token required' });
      }

      const payload = verifyToken(token);
      
      if (payload) {
        return res.status(200).json({
          success: true,
          user: payload.username,
          message: 'Token صحيح'
        });
      }

      return res.status(401).json({ error: 'Token غير صحيح أو منتهي الصلاحية' });
    }

    return res.status(400).json({ error: 'Invalid action' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}