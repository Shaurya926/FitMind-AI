# 🔑 Quick Fix: Missing Authentication Header

## The Error
```
API Error [POST /ai/plan]: Error: Missing Authentication header
```

## Cause
You're not logged in. The token is missing from localStorage.

## Quick Fix (2 minutes)

### 1. Refresh Page
Press `Ctrl+R`

### 2. Login or Register
- **Option A - Login:** Enter email and password, click "Login"
- **Option B - Register:** Enter name, email, password, click "Sign Up"

### 3. Dashboard Loads
✅ You're logged in!

### 4. Try Again
- Go to Plan page
- Click "Generate Plan"
- ✅ Should work now!

---

## Why?
- Protected routes need JWT token
- Token stored in localStorage after login
- api.js adds: `Authorization: Bearer {token}`
- Without token: request fails ❌
- With token: request succeeds ✅

---

## Verify
Open F12 Console and run:
```javascript
localStorage.getItem("token")
```

Should return something like: `eyJhbGciOiJIUzI1NiIs...`

If empty or null → You're not logged in, follow Quick Fix above.

---

**Time: 2 minutes** ⏱️
