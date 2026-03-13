# ShopEZ — Full Stack Shopping App

---

## 🚀 Quick Start

### Step 1 — Install dependencies
```bash
# Backend
cd server && npm install

# Frontend (new terminal)
cd client && npm install
```

### Step 2 — Seed the database (run ONCE)
```bash
cd server
npm run seed
```
This populates:
- ✅ 20 products across 5 categories with real images
- ✅ Admin banner image
- ✅ All 5 categories (Fashion, Electronics, Mobiles, Groceries, Sports-Equipment)
- ✅ Demo accounts (see below)

### Step 3 — Start the servers
```bash
# Terminal 1 — Backend
cd server && npm run dev

# Terminal 2 — Frontend
cd client && npm start
```

---

## 🔑 Demo Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@shopez.com | admin123 |
| Customer | customer@shopez.com | customer123 |

---

## 📦 Seeded Data

| Category | Products | Gender |
|----------|----------|--------|
| Fashion | 6 items | Men + Women |
| Electronics | 4 items | Unisex |
| Mobiles | 3 items | Unisex |
| Groceries | 3 items | Unisex |
| Sports-Equipment | 4 items | Unisex |

---

## ⚠️ Port Already in Use (EADDRINUSE :6001)

**Windows:**
```cmd
netstat -ano | findstr :6001
taskkill /PID <PID> /F
```
**Mac/Linux:**
```bash
lsof -ti:6001 | xargs kill -9
```

---

## Environment (`server/.env`)
```
MONGO_URI=mongodb://localhost:27017/shop
PORT=6001
```
