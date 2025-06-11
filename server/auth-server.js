import express from 'express';
import { MongoClient } from 'mongodb';
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
    const { email, username, password, birthdate, gender } = req.body;

    // 验证必填字段
    if (!email || !username || !password || !birthdate || !gender) {
      return res.status(400).json({ message: '所有字段都是必填的' });
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: '邮箱格式不正确' });
    }

    // 检查邮箱是否已存在
    const existingUser = await db.collection('user_profile').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: '该邮箱已被注册' });
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
      { userId: result.insertedId, email, username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: '注册成功',
      token,
      user: {
        id: result.insertedId,
        email,
        username
      }
    });
  } catch (error) {
    console.error('注册错误:', error);
    res.status(500).json({ message: '服务器错误，请稍后再试' });
  }
});

// 用户登录
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 验证必填字段
    if (!email || !password) {
      return res.status(400).json({ message: '邮箱和密码都是必填的' });
    }

    // 查找用户
    const user = await db.collection('user_profile').findOne({ email });
    if (!user) {
      return res.status(401).json({ message: '邮箱或密码不正确' });
    }

    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: '邮箱或密码不正确' });
    }

    // 生成JWT令牌
    const token = jwt.sign(
      { userId: user._id, email: user.email, username: user.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: '登录成功',
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    console.error('登录错误:', error);
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

// 获取用户信息（需要认证）
app.get('/api/user', authenticateToken, async (req, res) => {
  try {
    const user = await db.collection('user_profile').findOne(
      { _id: req.user.userId },
      { projection: { password: 0 } } // 排除密码字段
    );

    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('获取用户信息错误:', error);
    res.status(500).json({ message: '服务器错误，请稍后再试' });
  }
});

// 启动服务器
async function startServer() {
  await connectToMongo();
  app.listen(PORT, () => {
    console.log(`认证服务器运行在 http://localhost:${PORT}`);
  });
}

startServer();