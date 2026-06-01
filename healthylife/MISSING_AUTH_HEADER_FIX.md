# 🔑 Missing Authentication Header - Complete Guide

## ⚠️ The Error

```
API Error [POST /ai/plan]: Error: Missing Authentication header
```

**What it means:** You're trying to use a protected feature (like generating a plan) without being logged in.

---

## 🔍 Why This Happens

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Your token is missing because:**

Option 1: You cleared localStorage (from previous fix) but haven't logged back in
Option 2: You never logged in
Option 3: Token was deleted/expired

---

## ✅ The Complete Fix

### Step 1: Clear Old Data (If Needed)
Open browser DevTools (F12) → Console and run:
```javascript
localStorage.clear();
```

### Step 2: Refresh Page
Press `Ctrl+R` to refresh

### Step 3: Register or Login

#### Option A: Register New Account
1. Click **"Sign Up"** tab
2. Enter:
   - Name: `Your Name`
   - Email: `your-email@example.com`
   - Password: `Your Password`
3. Click **"Sign Up"**
4. ✅ You'll be logged in automatically

#### Option B: Login With Existing Account
1. Click **"Login"** tab
2. Enter:
   - Email: `your-email@example.com`
   - Password: `Your Password`
3. Click **"Login"**
4. ✅ You'll be logged in

### Step 4: Check localStorage (Verify)
In DevTools Console, run:
```javascript
console.log("Token:", localStorage.getItem("token"));
console.log("User:", localStorage.getItem("userName"));
```

**Should output:**
```
Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTI4ZGQ4YjJkNDI5MDAxMjM0NTY3OCIsImlhdCI6MTY0OTk3MzI1NywiZXhwIjoxNjUwNTc4MDU3fQ.abc123...
User: Your Name
```

### Step 5: Test Protected Features
Now try:
1. ✅ View Dashboard
2. ✅ Log health metrics
3. ✅ Generate training plan
4. ✅ Chat with AI
5. ✅ Write diary entries

---

## 🔐 How Authentication Works

```
1. User fills login form
   ↓
2. Frontend sends credentials to /api/users/login
   ↓
3. Backend verifies password, creates JWT token
   ↓
4. Token stored in localStorage as "token"
   ↓
5. All future requests include:
   Authorization: Bearer {token}
   ↓
6. Backend verifies token is valid
   ↓
7. Request succeeds ✅
```

**Without Step 4 (token in localStorage):**
- All protected requests fail
- You see: "Missing Authentication header"

---

## 🧪 Test API Calls Manually

Open DevTools Console and test:

### Get Today's Health Data
```javascript
apiRequest("/health/today", "GET")
  .then(data => console.log("Success:", data))
  .catch(err => console.error("Error:", err));
```

### Generate Weekly Plan
```javascript
const planData = {
  age: 25,
  weight: 70,
  height: 175,
  gender: "Male",
  goal: "Muscle Gain",
  activityLevel: "Moderate"
};

apiRequest("/ai/plan", "POST", planData)
  .then(data => console.log("Plan created:", data))
  .catch(err => console.error("Error:", err));
```

**Before login:** Both fail with "Missing Authentication header"  
**After login:** Both succeed ✅

---

## 🔄 Flow Diagram

```
┌─────────────────────────────────────────────┐
│ User visits http://localhost:5000           │
└────────────┬────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────┐
│ Check: localStorage.getItem("token")        │
│ Result: null (not logged in)                │
└────────────┬────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────┐
│ Show Login/Register Screen                  │
└────────────┬────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────┐
│ User enters credentials and clicks Login    │
└────────────┬────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────┐
│ POST /api/users/login                       │
│ Backend creates JWT token                   │
│ Response includes: token, name, id          │
└────────────┬────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────┐
│ localStorage.setItem("token", token_value)  │
│ localStorage.setItem("userName", name)      │
└────────────┬────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────┐
│ Show Dashboard                              │
│ All requests now include: Authorization     │
└────────────┬────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────┐
│ Protected features work! ✅                 │
│ - Generate plans                            │
│ - Log health data                           │
│ - Chat with AI                              │
│ - Write diary entries                       │
└─────────────────────────────────────────────┘
```

---

## 📋 Checklist

- [ ] Cleared localStorage (F12 Console)
- [ ] Refreshed page (Ctrl+R)
- [ ] Registered new account OR logged in
- [ ] Verified token in localStorage (F12 Console)
- [ ] Dashboard loads without errors
- [ ] Can generate training plan
- [ ] Can log health metrics
- [ ] Can chat with AI

---

## 💡 Key Points

1. **Token is required** for all protected routes (`/api/health/*`, `/api/ai/*`, `/api/diary`)
2. **Token stored in localStorage** under key `"token"`
3. **Token sent automatically** by `apiRequest()` function in every request
4. **Token expires** after 7 days (see JWT_EXPIRES_IN in .env)
5. **After logout** token is removed from localStorage

---

## 🚀 You're All Set!

After following these steps, everything should work perfectly!

**Estimated time:** 2 minutes ⏱️

If you still see "Missing Authentication header", double-check:
1. Token is in localStorage (F12)
2. Server is running (`✅ HealthyLife server running...`)
3. No errors in browser console (F12)
4. No errors in server terminal
