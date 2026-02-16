# 🚀 Deployment Guide - Vercel + Render

## 📋 Overview

Deploy your Task Management application with:
- **Frontend**: Vercel (for React app)
- **Backend**: Render (for Node.js API)

---

## 🎯 Step 1: Deploy Backend to Render

### 1. Prepare Backend for Production

1. **Update CORS for Production:**
   ```javascript
   // In backend/index.js, update CORS:
   app.use(cors({
     origin: ['https://your-app-name.vercel.app', 'http://localhost:3000'],
     credentials: true
   }));
   ```

2. **Create Render Account:**
   - Go to [Render](https://render.com)
   - Create a free account
   - Choose "New Web Service"

3. **Connect GitHub:**
   - Connect your GitHub repository
   - Select your task2 repository
   - Configure build settings:
     ```
     Build Command: npm install
     Start Command: npm start
     Node Version: 18
     ```

4. **Environment Variables:**
   Add these environment variables in Render:
   ```
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_long_secure_jwt_secret
   PORT=5000
   NODE_ENV=production
   ```

5. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment (2-5 minutes)
   - Copy your Render URL (e.g., `https://your-app.onrender.com`)

---

## 🎯 Step 2: Deploy Frontend to Vercel

### 1. Prepare Frontend for Production

1. **Update API URL:**
   ```javascript
   // In frontend/src/context/AuthContext.js
   // Replace all http://localhost:5000 with your Render URL
   const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
   ```

2. **Update all API calls:**
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
   REACT_APP_API_URL=https://your-backend-url.onrender.com
   ```

---

## 🔧 Alternative: Using Vercel Configuration File

1. **Update vercel.json:**
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "package.json",
         "use": "@vercel/static-build",
         "config": {
           "distDir": "build"
         }
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "/index.html",
         "methods": ["GET", "HEAD", "OPTIONS"]
       }
     ]
   }
   ```

2. **Deploy with config:**
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
2. **Backend URL**: `https://your-app.onrender.com`
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
If Render deployment fails:
1. Check environment variables
2. Verify MongoDB connection string
3. Check Render logs

---

## 💡 Pro Tips

1. **Custom Domain**: Add custom domain in Vercel dashboard
2. **SSL**: Both Vercel and Render provide free SSL
3. **Monitoring**: Use Vercel Analytics and Render metrics
4. **Environment**: Use different variables for dev/prod

---

## 🎉 Your Live Application

Once deployed:
- **Frontend**: `https://your-app-name.vercel.app`
- **Backend**: `https://your-app.onrender.com`
- **Database**: MongoDB Atlas (already configured)

Your Task Management application will be live and accessible to users worldwide!
