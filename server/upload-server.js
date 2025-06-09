import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// 启用CORS
app.use(cors());

// 提供静态文件服务
app.use(express.static(path.join(__dirname, '../console')));
app.use(express.json());

// 配置multer存储
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 将文件保存到console/images目录
        cb(null, path.join(__dirname, '../console/images'));
    },
    filename: function (req, file, cb) {
        // 保持原始文件名（从请求中获取）
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 限制5MB
    },
    fileFilter: function (req, file, cb) {
        // 只允许图片文件
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('只允许上传图片文件'));
        }
        cb(null, true);
    }
});

// 处理图片上传
app.post('/upload', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            throw new Error('没有收到文件');
        }
        res.json({
            success: true,
            message: '文件上传成功',
            filename: req.file.filename
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// 处理保存数据到JSON文件的请求
app.post('/save', (req, res) => {
    try {
        const data = req.body;
        const filePath = path.join(__dirname, '../console/data.json');
        
        // 将数据写入JSON文件
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        
        res.json({
            success: true,
            message: '数据保存成功'
        });
    } catch (error) {
        console.error('保存数据错误:', error);
        res.status(500).json({
            success: false,
            message: '数据保存失败: ' + error.message
        });
    }
});

// 启动服务器
app.listen(port, '0.0.0.0', () => {
    console.log(`服务器运行在 http://localhost:${port}`);
    console.log(`- 图片上传: http://localhost:${port}/upload`);
    console.log(`- 数据保存: http://localhost:${port}/save`);
    console.log(`- 控制台访问: http://localhost:${port}/index.html`);
});