# HealthyLife AI - Vercel Deployment Guide

## 🚀 Fixed Issues

### 1. **404 Error on Vercel** ✅
**Problem:** Frontend routes returned 404 because Vercel didn't know how to handle SPA fallback to `index.html`.
**Solution:** Created `vercel.json` with proper routing configuration that:
- Routes all `/api/*` requests to the backend
- Serves static CSS/JS files correctly
- Falls back to `index.html` for all other routes (SPA behavior)

### 2. **API Base URL Not Working** ✅
**Problem:** Frontend hardcoded API to `/api`, which didn't work when backend and frontend are on different domains.
**Solution:** Updated `frontend/js/api.js` to:
- Detect environment (localhost vs production)
- Use `http://localhost:5000/api` for local development
- Use `${window.location.origin}/api` for Vercel deployment

### 3. **JWT_SECRET Configuration** ✅
**Problem:** JWT_SECRET could be undefined in production, causing auth failures.
**Solution:** Added validation in:
- `middleware/auth.js` - Checks if JWT_SECRET exists before verification
- `controllers/userController.js` - Validates JWT_SECRET before token generation

### 4. **Catch-all Route Order Bug** ✅
**Problem:** 404 middleware executed before catch-all route, breaking API requests to non-existent routes.
**Solution:** Reordered `server.js`:
- Specific `/api` 404 handler comes after API route definitions
- Catch-all route comes after API 404 handler
- This ensures proper routing precedence

### 5. **Missing Request Logging** ✅
**Problem:** Difficult to debug routing issues in production.
**Solution:** Added request logging middleware in `server.js` for visibility into incoming requests.

---

## 📋 Vercel Deployment Checklist

### Step 1: Set Environment Variables on Vercel
Go to your Vercel project → Settings → Environment Variables:

```
MONGO_URI = mongodb+srv://username:password@cluster.mongodb.net/healthylife?retryWrites=true&w=majority
JWT_SECRET = your_super_secret_key_here_change_to_random_string
JWT_EXPIRES_IN = 7d
ANTHROPIC_API_KEY = sk-or-v1-xxxxxxxxxxxxx
```

### Step 2: Update Frontend API Calls
The `frontend/js/api.js` now automatically handles both local and production environments. No additional changes needed!

### Step 3: Deploy to Vercel
```bash
# Option A: Using Vercel CLI
vercel

# Option B: Push to GitHub and connect to Vercel
git push origin main
```

### Step 4: Verify Deployment
1. Open your Vercel deployment URL
2. Try to login/register (should work if MongoDB is accessible)
3. Check the Vercel Logs if there are issues: Deployment → Logs

---

## 🔍 Troubleshooting

### Issue: Still getting 404 errors
- Check `vercel.json` exists in the root directory
- Verify routes in `vercel.json` match your backend paths
- Clear browser cache and redeploy

### Issue: API calls timing out
- Check MongoDB Atlas firewall rules allow Vercel IPs
- Verify `MONGO_URI` is correct in Vercel environment variables
- Check network tab in browser DevTools for failed requests

### Issue: Authentication not working
- Verify `JWT_SECRET` is set in Vercel environment
- Check token is being saved in localStorage
- Look for "Token invalid or expired" errors in browser console

### Issue: CORS errors
- The backend has `cors()` middleware enabled, should accept requests from any origin
- If still failing, add your Vercel domain to CORS whitelist if needed

---

## 📁 Project Structure
```
healthylife/
├── vercel.json                 # ← NEW: Vercel configuration
├── backend/
│   ├── server.js              # ← FIXED: Request logging + route ordering
│   ├── package.json
│   ├── .env                   # Keep this private, set on Vercel
│   ├── .env.example           # Share this template
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── userController.js  # ← FIXED: JWT_SECRET validation
│   │   ├── aiController.js
│   │   ├── diaryController.js
│   │   └── healthController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── HealthData.js
│   │   ├── Diary.js
│   │   └── TrainingPlan.js
│   ├── middleware/
│   │   └── auth.js            # ← FIXED: JWT_SECRET validation
│   └── routes/
│       ├── userRoutes.js
│       ├── aiRoutes.js
│       ├── diaryRoutes.js
│       └── healthRoutes.js
└── frontend/
    ├── index.html
    ├── css/
    │   └── style.css
    └── js/
        ├── api.js             # ← FIXED: Environment-aware API base URL
        ├── app.js
        ├── auth.js
        ├── chat.js
        ├── dashboard.js
        ├── diary.js
        ├── plan.js
        ├── showcase.js
        └── tracker.js
```

---

## ⚡ Next Steps

1. **Add these environment variables to Vercel:**
   - MONGO_URI (MongoDB connection string)
   - JWT_SECRET (random secret key)
   - ANTHROPIC_API_KEY (for AI features)

2. **Test locally first:**
   ```bash
   cd backend
   npm install
   node server.js
   # Should see: ✅ MongoDB Connected + server running on port 5000
   ```

3. **Deploy:**
   ```bash
   git push origin main
   # Vercel automatically deploys from GitHub
   ```

4. **Monitor:**
   - Check Vercel Logs: https://vercel.com/dashboard
   - Check frontend console: Open DevTools (F12)
   - Test all features: Auth, Dashboard, Plan generation, Chat, Diary, Tracker

---

## 🐛 Bug Fixes Applied

| Issue | File | Fix |
|-------|------|-----|
| 404 on Vercel | vercel.json | Created new routing config |
| API calls fail | frontend/js/api.js | Added environment detection |
| JWT_SECRET undefined | middleware/auth.js, controllers/userController.js | Added validation |
| API route precedence | backend/server.js | Fixed middleware order |
| No request visibility | backend/server.js | Added logging middleware |

---

## 📞 Support

If issues persist:
1. Check Vercel Logs: https://vercel.com/dashboard → Logs
2. Check browser console: F12 → Console tab
3. Check browser network: F12 → Network tab
4. Verify all environment variables are set on Vercel
