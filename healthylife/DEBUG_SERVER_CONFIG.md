# 🔍 Server Configuration Error - Root Cause & Fix

## ❌ The Problem

When you try to generate a weekly plan, you get:
```
⚠️ Server configuration error
```

**Root Cause:** The middleware `protect` in `backend/middleware/auth.js` is checking:
```javascript
if (!process.env.JWT_SECRET) {
  return res.status(500).json({ success: false, message: "Server configuration error" });
}
```

This check is **failing** because the running Node process still has **old environment variables** from before `.env` was updated.

---

## 📋 Why This Happens

1. ✅ `.env` file WAS updated with proper `JWT_SECRET=healthylife_super_secret_key_2024_change_in_production`
2. ✅ Code is correct
3. ❌ BUT the **running Node process** still has cached the **OLD** `.env` values in memory

**Node.js loads `dotenv` ONCE at startup.** When you update `.env` while the server is running, the process doesn't see the new values until you restart it.

---

## 🔧 The Fix - 3 Steps

### Step 1: Stop the Old Server Process
```powershell
# Press Ctrl+C in the terminal where server is running
# OR run this to kill all node processes:
Get-Process node | Stop-Process -Force
```

### Step 2: Wait 2 seconds
```powershell
Start-Sleep -Seconds 2
```

### Step 3: Start Fresh Server
```powershell
cd "c:\Users\hp\OneDrive\Desktop\healthylife_project\healthylife\backend"
node server.js
```

---

## ✅ Expected Output After Restart

You should see:
```
✅ HealthyLife server running on http://localhost:5000
✅ MongoDB Connected: localhost
```

Then when you try to generate a plan, the logs will show:
```
📨 [2026-06-01T05:10:00.000Z] POST /api/ai/plan
Raw AI response: { "bmi": "24.5", ... }
```

**NO MORE** `❌ JWT_SECRET is not set` errors! ✅

---

## 🧪 Test Plan After Restart

1. Open: http://localhost:5000
2. Login with your account (or register new one)
3. Go to: **"Generate Plan"** page
4. Fill in:
   - Age: 25
   - Weight: 70
   - Height: 175
   - Gender: Male
   - Goal: Muscle Gain
   - Activity Level: Moderate
5. Click: **"Generate"**
6. ✅ Should work now!

---

## 📝 Files That Changed

### `.env` (Updated ✅)
```
BEFORE: JWT_SECRET=your_super_secret_jwt_key_change_this
AFTER:  JWT_SECRET=healthylife_super_secret_key_2024_change_in_production
```

### Middleware Chain (No changes needed - already correct ✅)
1. Request comes to `/api/ai/plan` 
2. Goes through `protect` middleware
3. Checks: `if (!process.env.JWT_SECRET)` 
4. If missing → returns 500 "Server configuration error" ❌
5. If present → verifies JWT token ✅
6. If valid → calls `generatePlan` controller

---

## 🎯 Quick Diagnosis Checklist

- [ ] Is server running? (Check terminal)
- [ ] Did you restart it AFTER updating `.env`? (Critical!)
- [ ] Are you logged in? (Token required)
- [ ] Check browser console (F12) for error details
- [ ] Check terminal logs for "Raw AI response" line

---

## 💡 Prevention Tips

For future `.env` changes:
1. Always **restart the server** after editing `.env`
2. OR use a package like `dotenv-reload` that watches `.env` changes
3. OR restart entire app when deploying to production

---

## 🚀 Next Steps

1. **Stop old server** (Ctrl+C)
2. **Wait 2 seconds**
3. **Start new server** (node server.js)
4. **Test plan generation** 
5. ✅ Done!

If you get different errors after restart, let me know the exact error message!
