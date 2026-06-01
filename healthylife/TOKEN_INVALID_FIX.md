# 🔐 Token Invalid or Expired - Root Cause & Fix

## ⚠️ What's Happening

You're seeing: **"Token invalid or expired"** or **"Token verification error: invalid signature"**

**Root Cause:** The JWT tokens in your browser's localStorage were generated with the **OLD JWT_SECRET**, but the server is now using the **NEW JWT_SECRET**.

---

## 📋 Why This Happens

1. ✅ Old server was running with `JWT_SECRET=your_super_secret_jwt_key_change_this`
2. ✅ You logged in and got a token - it was signed with OLD secret
3. ✅ Token stored in browser localStorage
4. ✅ We updated `.env` with `JWT_SECRET=healthylife_super_secret_key_2024_change_in_production`
5. ✅ Server restarted with NEW secret
6. ❌ Browser sends OLD token (signed with old secret)
7. ❌ Server tries to verify with NEW secret → **Signature doesn't match → Invalid!**

**It's like changing a lock's key - old keys won't work with the new lock!**

---

## ✅ The Fix (2 Steps)

### Step 1: Clear Old Tokens
Open browser DevTools (F12) and clear localStorage:

```javascript
// In browser console (F12):
localStorage.clear();
```

Or manually delete these:
- `healthylife_token`
- `healthylife_user`
- `authToken`

### Step 2: Log In Again
1. Refresh page (Ctrl+R)
2. Click **"Login"** or **"Sign Up"**
3. Login with your credentials
4. ✅ New token generated with NEW JWT_SECRET
5. ✅ Token stored in localStorage
6. ✅ Now everything works!

---

## 🔐 Technical Details

**Token Created With OLD Secret:**
```
Header.Payload.Signature_OLD_SECRET
```

**Server Verifying With NEW Secret:**
```
Header.Payload.Signature_OLD_SECRET ≠ Signature_NEW_SECRET
❌ INVALID!
```

**After Login With NEW Secret:**
```
Header.Payload.Signature_NEW_SECRET
✅ VALID!
```

---

## ✨ That's It!

Just clear localStorage and log back in. The new tokens will work perfectly! 

**Time needed:** 30 seconds ⏱️

---

## 🧪 Test After Login

1. Login successfully
2. Go to Dashboard
3. View health metrics
4. Go to Plan page
5. Click "Generate Plan"
6. Fill in details
7. Click "Generate"
8. ✅ Should work now!

---

## 🔒 Why We Changed JWT_SECRET

The original value was a placeholder:
```
❌ OLD: JWT_SECRET=your_super_secret_jwt_key_change_this
✅ NEW: JWT_SECRET=healthylife_super_secret_key_2024_change_in_production
```

This is a security best practice - never use placeholder secrets in production!

---

## 📞 If Problem Persists

1. Check localStorage is really empty (F12 → Application → Local Storage)
2. Make sure server shows: `✅ JWT_SECRET loaded successfully`
3. Try different browser or incognito mode
4. Restart browser completely

**You're good!** 🚀
