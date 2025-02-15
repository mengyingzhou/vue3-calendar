!/bin/bash

# 更新系统
sudo apt update
sudo apt upgrade -y

# install Nginx
sudo apt install nginx -y
cp ./nginx.conf /etc/nginx/sites-available/default
sudo nginx -t
sudo systemctl reload nginx

# ============ python envir =============
sudo apt install python3-pip -y
sudo python3 -m pip config set global.break-system-packages true

# install nodejs and npm
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

node -v   # 查看 Node.js 版本
npm -v    # 查看 npm 版本

# 记得重新生成新的node_module
npm install


# import mongdb key 
sudo apt-get install gnupg curl
curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg \
   --dearmor
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/8.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list
sudo apt-get update


# 安装 MongoDB
echo "Installing MongoDB..."
sudo apt install -y mongodb-org

# 启动 MongoDB 服务
sudo systemctl start mongod
sudo systemctl enable mongod

# 确认 MongoDB 服务正在运行
sudo systemctl status mongod

# 连接到 MongoDB Shell
echo "Starting MongoDB shell..."
mongosh <<EOF

use user_database

db.createCollection("user_profile")

db.user_profile.insert({
  "username": "JohnDoe",
  "real_name": "John Doe",
  "gender": "Male",
  "birth_date": {
    "solar": new Date("1990-01-01T00:00:00Z"),  
    "lunar": {
      "date": "二〇二五年 正月 十七日", 
      "year": "乙巳", 
      "month": "戊寅",
      "day": "甲寅"
    }
  }
})


db.createCollection("birthdate_collection")
db.birthdate_collection.insert({
  "user_id": "JohnDoe",
  "birthdates": [
    {
      "solar": new Date("1988-11-20T00:00:00Z"), 
      "lunar": {
        "date": "一九八八年 十月 十日",
        "year": "戊辰", 
        "month": "甲戌",
        "day": "乙酉"
      }
    },
    {
      "solar": new Date("1995-02-14T00:00:00Z"),
      "lunar": {
        "date": "一九九五年 十二月 二十六日",
        "year": "乙亥",
        "month": "丙子",
        "day": "丁酉"
      }
    }
  ]
})

db.createCollection("page_collection")
db.page_collection.insert({
  "user_id": "JohnDoe",
  "pages": [
    {
      "url": "https://www.example.com",
      "timestamp": new Date("2025-02-14T10:00:00Z")
    },
    {
      "url": "https://www.anotherpage.com",
      "timestamp": new Date("2025-02-14T12:30:00Z")
    }
  ]
})

print("Database and collections created successfully!")

EOF

echo "MongoDB setup and data insertion completed successfully!"
