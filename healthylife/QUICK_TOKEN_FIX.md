# 🔐 Quick Fix: Token Invalid or Expired

## The Issue
Your browser has OLD tokens signed with the OLD JWT_SECRET. Server now has NEW JWT_SECRET.

## The Fix (30 seconds)

### 1️⃣ Open Browser Console
Press **F12** → Console tab

### 2️⃣ Clear Old Tokens
Paste this and press Enter:
```javascript
localStorage.clear();
```

### 3️⃣ Log In Again
1. Refresh page (Ctrl+R)
2. Login with your credentials
3. Done! ✅

---

## Why?
- Old tokens = signed with old JWT_SECRET
- New server = uses new JWT_SECRET
- Old tokens don't match new signature
- New login = new token with new signature = ✅ works!

---

**That's it!** The "Token invalid or expired" error is fixed. 🚀
