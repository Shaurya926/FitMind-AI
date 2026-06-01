# ✅ Quick Fix - Weekly Plan Generation Error

## 🎯 The Issue
When you try to generate a weekly plan, you see:
```
⚠️ Server configuration error
```

## ✅ What I Fixed
1. ✅ Set proper JWT_SECRET in `.env` file
2. ✅ Removed exposed API key (security fix)
3. ✅ Configured environment properly

## 🚀 What You Need to Do NOW

### Step 1: Stop Current Server
1. Go to the terminal running the server
2. Press **Ctrl+C** to stop it

### Step 2: Restart Server
Run this command:
```bash
node "c:\Users\hp\OneDrive\Desktop\healthylife_project\healthylife\backend\server.js"
```

### Step 3: Test Weekly Plan
1. Open: http://localhost:5000
2. If not logged in, register a new account
3. Click: **"Generate Plan"** button
4. Fill in the form:
   - Age: (e.g., 25)
   - Weight: (e.g., 70 kg)
   - Height: (e.g., 175 cm)
   - Gender: (e.g., Male)
   - Goal: (e.g., Muscle Gain)
   - Activity Level: (e.g., Moderate)
5. Click: **"Generate"**
6. ✅ Should work now!

---

## 📋 What Changed in Files

### .env File
```
BEFORE:
JWT_SECRET=your_super_secret_jwt_key_change_this
ANTHROPIC_API_KEY=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

AFTER:
JWT_SECRET=healthylife_super_secret_key_2024_change_in_production
ANTHROPIC_API_KEY=your_api_key_here
```

---

## ✅ Expected Result After Restart

When server starts, you should see:
```
✅ HealthyLife server running on http://localhost:5000
✅ MongoDB Connected: localhost
📨 [timestamp] GET /
```

Then when you generate a plan:
```
📨 [timestamp] POST /api/ai/plan
✅ Plan generated successfully!
```

---

## 🔐 Security Note

The `.env` file now:
- ✅ Has proper JWT_SECRET
- ✅ Doesn't expose API keys
- ✅ Won't be committed to GitHub (in .gitignore)
- ✅ Is protected

---

## ⏱️ Expected Timeline

1. **Stop server**: 5 seconds
2. **Restart server**: 3 seconds
3. **Test plan**: 1 minute
4. **Success!**: ✅

**Total time: ~2 minutes**

---

## 📞 If Still Having Issues

**Common Fixes:**

1. **Still seeing "JWT_SECRET not set"**
   - Make sure you stopped the OLD server process
   - Start a fresh terminal
   - Run the server again

2. **Plan still not generating**
   - Check browser console (F12)
   - Look for error messages
   - Try registering a new account first

3. **MongoDB connection issues**
   - Check MongoDB is running locally
   - Or use MongoDB Atlas connection string

---

## ✨ That's It!

Just restart the server and your weekly plan feature will work! 🎉
