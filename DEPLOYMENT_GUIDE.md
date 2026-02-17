# 🚀 Deployment Guide - Vercel Full Stack

## 📋 Overview

Deploy your Task Management application with:
- **Frontend**: Vercel (React app)
- **Backend**: Vercel Serverless Functions (Node.js API)

---

## 🎯 Step 1: Backend Deployment (Vercel Serverless)

### 1. Prepare Backend for Vercel

1. **Create vercel.json in backend folder:**
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "index.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/api/(.*)",
         "dest": "/index.js"
       }
     ]
   }
   ```

2. **Update backend CORS:**
   ```javascript
   // In backend/index.js
   app.use(cors({
     origin: ['https://your-frontend-url.vercel.app'],
     credentials: true
   }));
   ```

3. **Deploy Backend to Vercel:**
   ```bash
   cd backend
   vercel --prod
   ```
   
4. **Get your backend URL** (e.g., `https://task2-kyf4.vercel.app`)

---

## 🎯 Step 2: Frontend Deployment (Vercel)

### 1. Prepare Frontend for Production

1. **Update API URL:**
   ```javascript
   // In frontend/src/context/AuthContext.js
   const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
   ```

2. **Update all API calls** to use relative paths:
   Replace `http://localhost:5000` with `${API_BASE_URL}` in:
   - `src/context/AuthContext.js`
   - `src/pages/Dashboard.js`
   - `src/pages/Tasks.js`
   - `src/pages/AddTask.js`

### 2. Deploy to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   cd frontend
   vercel --prod
   ```

4. **Or Deploy via Dashboard:**
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Connect your GitHub repository
   - Select `frontend` folder
   - Configure settings:
     ```
     Framework: React
     Build Command: npm run build
     Output Directory: build
     Install Command: npm install
     ```

5. **Add Environment Variable:**
   In Vercel dashboard > Settings > Environment Variables:
   ```
   REACT_APP_API_URL=https://task2-kyf4.vercel.app
   ```

---

## 🔧 Alternative: Monorepo Setup

### Single Repository Structure

1. **Create root vercel.json:**
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "backend/index.js",
         "use": "@vercel/node"
       },
       {
         "src": "frontend/package.json",
         "use": "@vercel/static-build",
         "config": {
           "distDir": "build"
         }
       }
     ],
     "routes": [
       {
         "src": "/api/(.*)",
         "dest": "/backend/index.js"
       },
       {
         "src": "/(.*)",
         "dest": "/frontend/index.html"
       }
     ]
   }
   ```

2. **Deploy entire project:**
   ```bash
   vercel --prod
   ```

---

## 🌐 After Deployment

### 1. Update CORS on Backend
Make sure your backend accepts requests from your Vercel domain:
```javascript
// backend/index.js
app.use(cors({
  origin: [
    'https://your-app-name.vercel.app',
    'https://your-app-name-*.vercel.app'  // For preview deployments
  ],
  credentials: true
}));
```

### 2. Test Your Application
1. **Frontend URL**: `https://your-app-name.vercel.app`
2. **Backend URL**: `https://task2-kyf4.vercel.app`
3. **Test registration, login, and task management**

---

## 🛠️ Troubleshooting

### CORS Issues
If you get CORS errors:
1. Check backend CORS configuration
2. Ensure Vercel domain is whitelisted
3. Verify API calls use correct URL

### Build Errors
If Vercel build fails:
1. Check all imports are correct
2. Verify environment variables
3. Check console logs in Vercel dashboard

### Backend Not Working
If backend deployment fails:
1. Check environment variables
2. Verify MongoDB connection string
3. Check Vercel function logs

---

## 💡 Pro Tips

1. **Custom Domain**: Add custom domain in Vercel dashboard
2. **SSL**: Vercel provides free SSL for both frontend and backend
3. **Monitoring**: Use Vercel Analytics
4. **Environment**: Use different variables for dev/prod

---

## 🎉 Your Live Application

Once deployed:
- **Frontend**: `https://your-app-name.vercel.app`
- **Backend**: `https://task2-kyf4.vercel.app`
- **Database**: MongoDB Atlas (already configured)

Your Task Management application will be live and accessible to users worldwide!
