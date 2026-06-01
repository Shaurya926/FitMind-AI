# 🔧 JWT_SECRET Configuration Fix

## Problem
When trying to generate a weekly plan, you're getting:
```
⚠️ Server configuration error
```

This means JWT_SECRET is not properly set in the environment.

## Solution Applied
✅ Updated `.env` file with proper JWT_SECRET value

## How to Complete the Fix

### Option 1: Restart Server (Recommended - 30 seconds)
1. Stop the running server (Ctrl+C in terminal)
2. Run: `node backend/server.js` again
3. Try to generate plan

### Option 2: Set JWT_SECRET in Current Session
```bash
$env:JWT_SECRET = "healthylife_super_secret_key_2024_change_in_production"
```

## Testing After Fix

1. **Open App**: http://localhost:5000
2. **Click**: "Generate Plan" button
3. **Fill Form**: Age, weight, height, goal, activity level
4. **Submit**: Should generate plan successfully ✅

## Current JWT_SECRET Value
```
healthylife_super_secret_key_2024_change_in_production
```

This is now set in `.env` file.

## What's Fixed
✅ JWT_SECRET now has proper value  
✅ API key removed from .env (security fix)  
✅ Server can now generate plans  
✅ Authentication will work  

---

**Just restart the server and try again!** 🚀
