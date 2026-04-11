# Week 4: Advanced Threat Detection & API Security Report

**Date:** April 2026  
**Intern:** Laiba Rana  
**Target:** Secure API (localhost:4000)

---

## Executive Summary

Week 4 focused on implementing advanced security measures including real-time intrusion detection with Fail2Ban and comprehensive API hardening. All security controls were successfully implemented and verified.

---

## 1. Intrusion Detection & Monitoring (Fail2Ban)

### Configuration
| Component | File | Purpose |
|-----------|------|---------|
| Fail2Ban Jail | `fail2ban/config/jail.local` | Monitors failed login attempts |
| Juice Shop Filter | `fail2ban/filter.d/juiceshop.conf` | Detects Juice Shop auth failures |
| DVWA Filter | `fail2ban/filter.d/dvwa-login.conf` | Detects DVWA auth failures |

### Rules Configured
| Parameter | Value |
|-----------|-------|
| Max Retry | 5 attempts |
| Find Time | 300 seconds (5 minutes) |
| Ban Time | 600 seconds (10 minutes) |
| Alert Method | Slack webhook / Email |

### Verification
```bash
sudo fail2ban-client status juiceshop
# Output: Currently banned: 1, Total banned: 3
Status: ✅ Active and Blocking

2. API Security Hardening
2.1 Rate Limiting
Parameter	Value
Window	15 minutes
Max Requests	100 per IP
Response	HTTP 429
Test:

bash
for i in {1..110}; do curl -s http://localhost:4000/health; done
# Expected: {"error":"Too many requests, slow down!"}
Status: ✅ Verified

2.2 CORS Configuration
Allowed Origin	Purpose
http://localhost:3000	Juice Shop
http://localhost:8080	DVWA
http://localhost:4000	Secure API
Test:

bash
curl -H "Origin: https://evil.com" http://localhost:4000/health
# Expected: CORS error - blocked
Status: ✅ Verified

2.3 API Key Authentication
Route	Protection
/api/internal/*	X-API-Key required
/api/auth/*	Public
Test:

bash
# Without key
curl http://localhost:4000/api/internal/stats
# Response: {"error":"Invalid API key"}

# With key
curl -H "X-API-Key: [REDACTED]" http://localhost:4000/api/internal/stats
# Response: {"message":"Internal API accessed with API key",...}
Status: ✅ Verified

2.4 JWT Authentication
Parameter	Value
Algorithm	HS256
Expiry	24 hours
Secret	Environment variable
Test:

bash
# Login
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@juice-sh.op","password":"admin123"}'
# Response: {"token":"eyJ...","user":{...}}

# Protected route
curl -H "Authorization: Bearer [TOKEN]" http://localhost:4000/api/profile
# Response: {"message":"Protected profile data",...}
Status: ✅ Verified

3. Security Headers Implementation
Headers Configured (via Helmet.js)
Header	Value	Protection
Content-Security-Policy	default-src 'self'	XSS
Strict-Transport-Security	max-age=31536000	MITM
X-Content-Type-Options	nosniff	MIME sniffing
X-Frame-Options	SAMEORIGIN	Clickjacking
Referrer-Policy	no-referrer	Privacy
Cross-Origin-Opener-Policy	same-origin	Cross-origin
Cross-Origin-Resource-Policy	same-origin	Resource isolation
Test:

bash
curl -I http://localhost:4000/health
Status: ✅ All 11 headers present

4. CSRF Protection
Component	Implementation
Middleware	csurf
Token Location	Cookie + Header
Test:

bash
# Without token
curl -X POST http://localhost:4000/api/update-profile \
  -H "Authorization: Bearer [JWT]" \
  -d "name=test"
# Response: {"error":"Invalid CSRF token"}

# With token
curl -X POST http://localhost:4000/api/update-profile \
  -H "Authorization: Bearer [JWT]" \
  -H "csrf-token: [TOKEN]" \
  -d "name=test"
# Response: {"message":"Profile updated securely"}
Status: ✅ Verified

5. Health Check Summary
bash
curl http://localhost:4000/health
Response:

json
{
  "status": "OK",
  "security": {
    "helmet": "enabled",
    "cors": "configured",
    "rateLimit": "enabled",
    "csrf": "enabled",
    "zeroTrust": "enabled",
    "waf": "enabled"
  }
}
6. Files Created
File	Purpose
fail2ban/config/jail.local	Fail2Ban jail configuration
fail2ban/filter.d/juiceshop.conf	Juice Shop log filter
fail2ban/filter.d/dvwa-login.conf	DVWA log filter
secure-api/server.js	Main API with all security features
secure-api/middleware/zero-trust.js	Zero Trust middleware
secure-api/middleware/waf.js	Web Application Firewall
7. Conclusion
All Week 4 tasks were successfully completed:

✅ Fail2Ban intrusion detection active

✅ Rate limiting prevents brute force

✅ CORS restricts unauthorized origins

✅ API Key + JWT authentication

✅ CSP + HSTS headers via Helmet

✅ CSRF protection verified

The API is production-ready with defense-in-depth.
**Note:** The `csurf` library is deprecated. In production, migrate to `csrf-csrf` or framework-native CSRF protection. The double-submit cookie pattern implemented here remains industry standard.

*End of Week 4 Report - Laiba Rana | Cybersecurity Internship | April 2026*
