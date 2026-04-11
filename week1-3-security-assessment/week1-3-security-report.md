# Weeks 1-3: Security Assessment & Basic Hardening Report

**Intern:** Laiba Rana  
**Date:** March 2026  
**Target:** OWASP Juice Shop (localhost:3000)

---

## Executive Summary

This report documents the security assessment of OWASP Juice Shop conducted over Weeks 1-3 of the cybersecurity internship. The assessment identified **five vulnerabilities** including critical SQL injection and high-risk XSS. Basic security hardening was then implemented in a custom secure API (port 4000) to remediate all findings.

---

## Vulnerabilities Discovered

| # | Vulnerability | Location | Severity | OWASP Category |
|---|--------------|----------|----------|----------------|
| 1 | Reflected XSS | Search Bar | **HIGH** | A03: Injection |
| 2 | SQL Injection | Login Form | **CRITICAL** | A03: Injection |
| 3 | Cookie Exposure | Search Bar (via XSS) | **HIGH** | A03: Injection |
| 4 | Missing CSP Header | All Pages | **MEDIUM** | A05: Security Misconfiguration |
| 5 | Missing HSTS Header | All Pages | **MEDIUM** | A05: Security Misconfiguration |

**Full details:** See [findings.md](findings.md)

---

## Security Measures Implemented

| Control | Technology | Purpose |
|---------|------------|---------|
| Input Validation | validator.js | Block malicious payloads |
| Password Hashing | bcrypt (10 rounds) | Secure credential storage |
| JWT Authentication | jsonwebtoken | Stateless user sessions |
| Security Headers | Helmet.js | CSP, HSTS, X-Frame-Options |
| Logging | Winston | Security event audit trail |

---

## Verification Results

| Test | Juice Shop (Port 3000) | Secure API (Port 4000) |
|------|------------------------|------------------------|
| XSS Payload | ❌ Alert executed | ✅ Blocked by CSP |
| SQL Injection | ❌ Admin bypass | ✅ Blocked by validation |
| Cookie Access via XSS | ❌ Cookie exposed | ✅ HttpOnly + CSP |
| Security Headers | ❌ CSP/HSTS missing | ✅ 11 headers present |

---

## Evidence

| Finding | Screenshot |
|---------|------------|
| XSS Alert | `screenshots/03-xss-alert-success.png` |
| SQLi Admin Login | `screenshots/05-admin-login-sqli.png` |
| Cookie Exposure | `screenshots/04-cookie-exposure.png` |
| Admin Profile Access | `screenshots/06-admin-profile-access.png` |

---

## Conclusion

All vulnerabilities discovered in OWASP Juice Shop were successfully remediated in the secure API implementation. The secure API now includes defense-in-depth with input validation, strong password hashing, JWT authentication, comprehensive security headers, and logging.

**Next Steps:** See Weeks 4-6 for advanced security hardening (Fail2Ban, rate limiting, CSRF protection, OWASP ZAP audit).
