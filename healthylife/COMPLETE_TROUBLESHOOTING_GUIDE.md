# 🔧 Complete Troubleshooting & Fix Guide

## 📋 Current Status

✅ **Server:** Running on http://localhost:5000  
✅ **JWT_SECRET:** Loaded successfully  
✅ **MongoDB:** Connected  

---

## 🐛 Problems & Solutions

### Problem 1: "Missing Authentication header"

**Cause:** Token not being sent with the request

**Solution:**

1. **Check if logged in:**
   - Open DevTools (F12)
   - Go to Application tab → Local Storage
   - Look for key: `token`
   - If empty/missing → Need to login

2. **Login/Register:**
   - Refresh page (Ctrl+R)
   - Register new account OR login
   - Verify `token` appears in localStorage

3. **Clear old tokens (if needed):**
   ```javascript
   localStorage.clear();
   ```

4. **Retry the action:**
   - Go to Plan page
   - Fill in metrics
   - Click "Generate Plan"

---

### Problem 2: "Token invalid or expired"

**Cause:** Token was created with old JWT_SECRET

**Solution:**

1. Clear localStorage:
   ```javascript
   localStorage.clear();
   ```

2. Refresh page (Ctrl+R)

3. Login/Register with new account

4. Try again

---

### Problem 3: Server Not Starting

**Symptoms:** Node command returns exit code 1

**Causes & Solutions:**

#### A. .env file not found
```powershell
# Verify file exists:
Test-Path "c:\Users\hp\OneDrive\Desktop\healthylife_project\healthylife\backend\.env"
```

Should return: `True`

#### B. JWT_SECRET not set
Check .env file has:
```
JWT_SECRET=healthylife_super_secret_key_2024_change_in_production
```

#### C. Port 5000 already in use
```powershell
# Stop all node processes:
Get-Process node | Stop-Process -Force

# Wait 2 seconds:
Start-Sleep -Seconds 2

# Try again:
node "c:\Users\hp\OneDrive\Desktop\healthylife_project\healthylife\backend\server.js"
```

---

### Problem 4: App Not Loading

**Symptoms:** Blank page at http://localhost:5000

**Solutions:**

1. **Hard refresh:** Ctrl+Shift+R
2. **Clear browser cache:** F12 → Network → Disable cache → Refresh
3. **Check console errors:** F12 → Console → Look for red errors
4. **Check server is running:**
   ```powershell
   Get-Process node
   ```
   Should show a running node process

---

### Problem 5: Database Connection Failed

**Symptoms:** Server shows ❌ MongoDB connection error

**Solutions:**

#### A. Local MongoDB not running
```powershell
# Start MongoDB (Windows):
# Usually: mongod command or MongoDB service

# Check if running:
Get-Process mongod
```

#### B. Connection string wrong
Check .env has:
```
MONGO_URI=mongodb://localhost:27017/healthylife
```

#### C. Use MongoDB Atlas instead
Replace .env MONGO_URI with:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/healthylife
```

---

## ✅ Complete Workflow (Step by Step)

### 1️⃣ Verify Server
```powershell
# Check server is running:
cd "c:\Users\hp\OneDrive\Desktop\healthylife_project\healthylife"
node backend/server.js
```

**Expected output:**
```
✅ JWT_SECRET loaded successfully
✅ HealthyLife server running on http://localhost:5000
✅ MongoDB Connected: localhost
```

### 2️⃣ Open App
Go to: http://localhost:5000

**Should show:** Login/Register screen

### 3️⃣ Register Account
- Click "Sign Up" tab
- Enter: Name, Email, Password
- Click "Sign Up"
- ✅ Logged in automatically

### 4️⃣ Check Token
Open F12 → Application → Local Storage:
- Look for `token` key
- Value should start with: `eyJhbGc...`

### 5️⃣ Test Features
- Dashboard: View empty
- Plan: Generate training plan
- Health: Log metrics
- Chat: Ask AI questions
- Diary: Write entries

---

## 🧪 Advanced Debugging

### Check API Calls
Open F12 → Network tab → Try an action:
- Look for requests like `POST /api/ai/plan`
- Check: Status (should be 200)
- Check: Headers tab → Authorization header
- Check: Response tab → Data returned

### Check Browser Console
Open F12 → Console:
```javascript
// Check token exists:
localStorage.getItem("token")

// Check server is reachable:
fetch("http://localhost:5000/api/health/today").then(r => r.json()).then(console.log)

// Clear all storage:
localStorage.clear()
```

### Check Server Logs
Look at terminal running server for messages like:
```
📨 [2026-06-01T05:17:31.197Z] POST /api/ai/plan
AI Plan Error: ...
```

---

## 🚀 Quick Restart (If Something Breaks)

```powershell
# Stop all node processes:
Get-Process node | Stop-Process -Force

# Wait:
Start-Sleep -Seconds 3

# Clear browser cache (in DevTools):
# F12 → Application → Local Storage → Clear All

# Refresh browser:
# Ctrl+Shift+R

# Start server fresh:
node "c:\Users\hp\OneDrive\Desktop\healthylife_project\healthylife\backend\server.js"
```

---

## 📞 If Still Having Issues

**Check in this order:**

1. ✅ Server running? (`✅ HealthyLife server running...`)
2. ✅ MongoDB connected? (`✅ MongoDB Connected`)
3. ✅ Token in localStorage? (F12 → Application)
4. ✅ Browser console errors? (F12 → Console - red errors?)
5. ✅ Server terminal errors? (Look at server terminal output)

---

## 🎯 Success Checklist

- [ ] Server shows 3 ✅ messages at startup
- [ ] App loads at http://localhost:5000
- [ ] Can register new account
- [ ] Token appears in localStorage
- [ ] Can view dashboard without errors
- [ ] Can generate training plan
- [ ] Can log health metrics
- [ ] Can chat with AI
- [ ] Can write diary entries

**If all checked:** App is fully working! 🚀

---

## 📚 Key Files

- **Backend:** `backend/server.js` - Main server
- **Auth:** `backend/middleware/auth.js` - Token validation
- **API:** `frontend/js/api.js` - API requests
- **Auth UI:** `frontend/js/auth.js` - Login/Register
- **Config:** `backend/.env` - Environment variables

---

**Total time to fix:** 5-15 minutes ⏱️  
**Difficulty:** Easy to Medium
