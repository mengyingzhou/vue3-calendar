import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

const app = express();
const PORT = 3001;
const MONGODB_URI = 'mongodb://localhost:27017';
const JWT_SECRET = 'your_jwt_secret_key';

// 中间件
app.use(cors());
app.use(express.json());

// 连接到MongoDB
let db;
async function connectToMongo() {
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db('user_database');
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

// 用户注册
app.post('/api/register', async (req, res) => {
  try {
    const { phone, email, username, password, birthdate, gender } = req.body;

    // 验证必填字段
    if ((!email && !phone) || !username || !password || !birthdate || !gender) {
      return res.status(400).json({ message: '用户名、密码、出生日期和性别都是必填的，邮箱和手机号至少需要提供一个' });
    }

    // 如果提供了邮箱，验证邮箱格式
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: '邮箱格式不正确' });
      }

      // 检查邮箱是否已存在
      const existingUserByEmail = await db.collection('user_profile').findOne({ email });
      if (existingUserByEmail) {
        return res.status(400).json({ message: '该邮箱已被注册' });
      }
    }

    // 如果提供了手机号，验证手机号格式（中国大陆手机号）
    if (phone) {
      const phoneRegex = /^1[3-9]\d{9}$/;
      if (!phoneRegex.test(phone)) {
        return res.status(400).json({ message: '手机号格式不正确' });
      }

      // 检查手机号是否已存在
      const existingUserByPhone = await db.collection('user_profile').findOne({ phone });
      if (existingUserByPhone) {
        return res.status(400).json({ message: '该手机号已被注册' });
      }
    }

    // 检查用户名是否已存在
    const existingUsername = await db.collection('user_profile').findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: '该用户名已被使用' });
    }

    // 加密密码
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 创建用户
    const newUser = {
      email,
      phone,
      username,
      password: hashedPassword,
      birthdate,
      gender,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // 保存用户到数据库
    const result = await db.collection('user_profile').insertOne(newUser);

    // 生成JWT令牌
    const token = jwt.sign(
      { 
        userId: result.insertedId, 
        username,
        ...(email && { email }),
        ...(phone && { phone })
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: '注册成功',
      token,
      user: {
        id: result.insertedId,
        username,
        ...(email && { email }),
        ...(phone && { phone })
      }
    });
  } catch (error) {
    res.status(500).json({ message: '服务器错误，请稍后再试' });
  }
});

// 用户登录
app.post('/api/login', async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    // 验证必填字段
    if ((!email && !phone) || !password) {
      return res.status(400).json({ message: '账号和密码都是必填的' });
    }

    // 构建查询条件（邮箱或手机号）
    const query = {};
    if (email) {
      query.email = email;
    } else if (phone) {
      query.phone = phone;
    }

    // 查找用户
    const user = await db.collection('user_profile').findOne(query);
    if (!user) {
      return res.status(401).json({ message: '账号或密码不正确' });
    }

    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: '账号或密码不正确' });
    }

    // 生成JWT令牌
    const token = jwt.sign(
      { 
        userId: user._id, 
        username: user.username,
        ...(user.email && { email: user.email }),
        ...(user.phone && { phone: user.phone })
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: '登录成功',
      token,
      user: {
        id: user._id,
        username: user.username,
        ...(user.email && { email: user.email }),
        ...(user.phone && { phone: user.phone })
      }
    });
  } catch (error) {
    res.status(500).json({ message: '服务器错误，请稍后再试' });
  }
});

// 验证令牌中间件
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: '未提供认证令牌' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: '令牌无效或已过期' });
    }
    req.user = user;
    next();
  });
};

// 更新用户信息
app.put('/api/user/update', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { username, email, phone, birthdate, gender } = req.body;

    // 验证必填字段
    if (!username || !email || !phone || !birthdate || !gender) {
      return res.status(400).json({ message: '所有字段都是必填的' });
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: '邮箱格式不正确' });
    }

    // 如果提供了手机号，验证手机号格式（中国大陆手机号）
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: '手机号格式不正确' });
    }

    // 检查邮箱是否已被其他用户使用
    const existingUserByEmail = await db.collection('user_profile').findOne({
      email,
      _id: { $ne: new ObjectId(userId) }
    });
    if (existingUserByEmail) {
      return res.status(400).json({ message: '该邮箱已被其他用户使用' });
    }

    // 检查手机号是否已被其他用户使用
    const existingUserByPhone = await db.collection('user_profile').findOne({
      phone,
      _id: { $ne: new ObjectId(userId) }
    });
    if (existingUserByPhone) {
      return res.status(400).json({ message: '该手机号已被其他用户使用' });
    }

    // 检查用户名是否已被其他用户使用
    const existingUsername = await db.collection('user_profile').findOne({
      username,
      _id: { $ne: new ObjectId(userId) }
    });
    if (existingUsername) {
      return res.status(400).json({ message: '该用户名已被其他用户使用' });
    }

    // 更新用户信息
    const result = await db.collection('user_profile').updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          username,
          email,
          phone,
          birthdate,
          gender,
          updatedAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: '用户不存在' });
    }

    res.status(200).json({ message: '用户信息更新成功' });
  } catch (error) {    
    // 提供更详细的错误信息
    if (error.name === 'MongoError' || error.name === 'MongoServerError') {
      // MongoDB 错误
      if (error.code === 11000) {
        // 唯一索引冲突
        const field = Object.keys(error.keyPattern)[0];
        let message = '该信息已被使用';
        if (field === 'email') message = '该邮箱已被使用';
        if (field === 'phone') message = '该手机号已被使用';
        return res.status(400).json({ message });
      }
    }
    
    // 如果有具体的错误消息，则返回它
    const errorMessage = error.message || '服务器错误，请稍后再试';
    res.status(500).json({ message: errorMessage });
  }
});

// 修改密码
app.put('/api/user/change-password', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    
    // 检查请求体是否为空或不是对象
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ message: '无效的请求数据' });
    }
    
    const { oldPassword, newPassword } = req.body;
    
    // 验证必填字段
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: '当前密码和新密码都是必填的' });
    }
    
    // 确保密码是字符串类型
    if (typeof oldPassword !== 'string' || typeof newPassword !== 'string') {
      return res.status(400).json({ message: '密码必须是字符串类型' });
    }

    // 获取用户信息
    const user = await db.collection('user_profile').findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }

    // 验证当前密码
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: '当前密码不正确' });
    }

    // 加密新密码
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // 更新密码
    await db.collection('user_profile').updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          password: hashedPassword,
          updatedAt: new Date()
        }
      }
    );

    res.status(200).json({ message: '密码修改成功' });
  } catch (error) {
    // 提供更详细的错误信息
    if (error instanceof SyntaxError) {
      return res.status(400).json({ message: '请求数据格式错误: ' + error.message });
    }
    res.status(500).json({ message: '服务器错误，请稍后再试' });
  }
});

// 获取用户信息
app.get('/api/user', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;  // 优先使用查询参数
    const user = await db.collection('user_profile').findOne(
      { _id: new ObjectId(userId) },
      { projection: { password: 0 } }
    );

    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: '服务器错误，请稍后再试' });
  }
});

// 启动服务器
async function startServer() {
  await connectToMongo();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`认证服务器运行在 http://localhost:${PORT}`);
  });
}

startServer();