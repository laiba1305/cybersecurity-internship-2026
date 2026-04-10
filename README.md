# cybersecurity-internship-2026

OWASP Juice Shop Security Assessment \& Hardening - Weeks 4-6

CYBERSECURITY INTERNSHIP PROJECT 2026

Intern: Laiba Rana

GitHub: laiba1305

Deadline: April 14, 2026

Environment: Windows 11 | Docker | Node.js v24.14.1



================================================================================

PROJECT OVERVIEW

================================================================================



This repository contains the complete security assessment, hardening 

implementation, and penetration testing of OWASP Juice Shop as part of the 

cybersecurity internship program. All tasks from Weeks 4-6 are documented 

with code, configurations, and audit reports.



================================================================================

QUICK START

================================================================================



Clone the repository:

git clone https://github.com/laiba1305/cybersecurity-internship-2026.git

cd cybersecurity-internship-2026



Install dependencies:

cd secure-api

npm install



Start the secure API:

npm start



Services:

\- OWASP Juice Shop: http://localhost:3000 (Vulnerable test application)

\- Secure API: http://localhost:4000 (Hardened Express API)

\- DVWA: http://localhost:8080 (Additional test target)



================================================================================

REPOSITORY STRUCTURE

================================================================================



secure-api/                  Week 4: Hardened Express API

&#x20; - server.js                Main server with all security features

&#x20; - package.json             Dependencies

&#x20; - middleware/              Security middleware



fail2ban/                    Week 4: Intrusion Detection

&#x20; - config/jail.local        Fail2Ban jail configuration

&#x20; - filter.d/                Log filters for Juice Shop and DVWA



reports/                     All scan reports

&#x20; - week5/                   SQLMap, Nmap, Nikto outputs

&#x20; - week6/                   Final audit report, ZAP scan, Docker scan



docker-compose.yml           All services configuration

README.md                    This file



================================================================================

WEEK 4: ADVANCED THREAT DETECTION AND API SECURITY

================================================================================



Tasks Completed:

\- Intrusion Detection: Fail2Ban with custom filters

\- Real-time Alerting: Slack webhook and Email notifications

\- Rate Limiting: express-rate-limit (100 requests per 15 minutes)

\- CORS Configuration: Restricted to localhost:3000 and localhost:8080

\- API Key Authentication: X-API-Key header validation

\- JWT Authentication: jsonwebtoken with 24 hour expiry

\- CSP Header: Content-Security-Policy via Helmet

\- HSTS Header: Strict-Transport-Security enforced



Test Credentials:

\- Email: admin@juice-sh.op
Password: [See .env.example]
API Key: [See .env.example]


API Endpoints:

\- GET  /health              - Security status check (Public)

\- POST /api/auth/login      - JWT login (Public)

\- POST /api/auth/register   - User registration (Public)

\- GET  /api/profile         - Protected profile (JWT required)

\- GET  /api/internal/stats  - Internal metrics (API Key required)

\- GET  /api/csrf-token      - Get CSRF token (Public)

\- POST /api/update-profile  - Protected update (JWT + CSRF required)



================================================================================

WEEK 5: ETHICAL HACKING AND EXPLOITATION

================================================================================



Tasks Completed:

\- Reconnaissance: Nmap, Nikto, Gobuster

\- SQL Injection Discovery: SQLMap on /rest/products/search

\- SQL Injection Prevention: Parameterized queries (Sequelize ORM)

\- CSRF Protection: csurf middleware

\- CSRF Testing: curl and Burp Suite



Key Finding - SQL Injection:

\- Endpoint: /rest/products/search?q=

\- Type: Boolean-based blind SQL injection

\- Payload: test%' AND 7919=7919 AND 'ABMb%'='ABMb

\- Database: SQLite

\- Severity: CRITICAL



Remediation (Before vs After):

VULNERABLE CODE:

const query = "SELECT \* FROM Products WHERE name LIKE '%" + req.query.q + "%'";



SECURE CODE (Parameterized Query):

const products = await Product.findAll({

&#x20;   where: { name: { \[Op.like]: '%' + req.query.q + '%' } }

});



CSRF Protection Test Results:

\- Without CSRF Token: POST /api/update-profile returns 403 Forbidden

\- With Valid CSRF Token: POST + csrf-token header returns 200 Success



================================================================================

WEEK 6: SECURITY AUDITS AND FINAL DEPLOYMENT

================================================================================



Tasks Completed:

\- Automated Scanning: OWASP ZAP

\- Web Server Scan: Nikto

\- Port Scanning: Nmap

\- Container Security: Docker Scout

\- Compliance Check: OWASP Top 10

\- Final Penetration Test: Burp Suite



Vulnerability Summary:

\- SQL Injection (Login): CRITICAL -> FIXED (Parameterized queries)

\- SQL Injection (Search): CRITICAL -> FIXED (ORM parameterization)

\- Reflected XSS: HIGH -> FIXED (CSP + Output encoding)

\- Cookie Exposure: HIGH -> FIXED (HttpOnly flags)

\- Missing CSP: MEDIUM -> FIXED (Helmet CSP)

\- Missing HSTS: MEDIUM -> FIXED (Helmet HSTS)

\- CORS Wildcard: MEDIUM -> FIXED (Origin whitelist)

\- No Rate Limiting: MEDIUM -> FIXED (express-rate-limit)

\- CSRF Vulnerability: MEDIUM -> FIXED (csurf tokens)



OWASP Top 10 Compliance (10/10 - 100%):

A01: Broken Access Control      - FIXED (JWT + API Keys)

A02: Cryptographic Failures     - FIXED (bcrypt hashing)

A03: Injection                  - FIXED (Parameterized queries)

A04: Insecure Design            - FIXED (Rate limiting + CSRF)

A05: Security Misconfiguration  - FIXED (Helmet headers)

A06: Vulnerable Components      - FIXED (npm audit fixed)

A07: Auth Failures              - FIXED (JWT + login limits)

A08: Software Integrity         - FIXED (Docker Scout)

A09: Logging Failures           - FIXED (Winston logger)

A10: SSRF                       - FIXED (Input validation)



================================================================================

DOCKER SERVICES

================================================================================



Juice Shop    Port 3000    juice-shop       Vulnerable test app

Secure API    Port 4000    secure-api       Hardened Express API

DVWA          Port 8080    dvwa             Additional test target

Kali Linux    -            kali-pentest     Penetration testing

OWASP ZAP     Port 8090    owasp-zap        Security scanning

Fail2Ban      -            fail2ban         Intrusion detection



================================================================================

TESTING THE SECURITY FEATURES

================================================================================



Test Rate Limiting (should block after 100 requests):

for i in {1..110}; do curl -s http://localhost:4000/health; done

Expected: HTTP 429 Too Many Requests



Test API Key Authentication (without key - should fail):

curl http://localhost:4000/api/internal/stats

Expected: {"error":"Invalid API key"}



Test API Key Authentication (with key - should succeed):

curl -H "X-API-Key: juice-shop-internal-2026" http://localhost:4000/api/internal/stats

Expected: {"message":"Internal API accessed with API key",...}



Test CSRF Protection:

curl http://localhost:4000/api/csrf-token

curl -X POST http://localhost:4000/api/update-profile -H "Authorization: Bearer \[JWT]" -d "name=test"

Expected: {"error":"Invalid CSRF token"}



================================================================================

TECHNOLOGIES USED

================================================================================



Backend: Node.js, Express

Security: Helmet, CORS, rate-limit, JWT, bcrypt, csurf

Testing: Kali Linux, SQLMap, Nmap, Nikto, OWASP ZAP, Burp Suite

Monitoring: Fail2Ban, Winston

Containerization: Docker, Docker Compose, Docker Scout

Version Control: Git, GitHub



================================================================================

KEY LEARNINGS

================================================================================



1\. Defense in Depth: Multiple security layers provide comprehensive protection

2\. Ethical Hacking: Understanding attack vectors is essential for defense

3\. OWASP Top 10: Industry standard framework for web application security

4\. Automation: Security scanning tools catch vulnerabilities humans might miss

5\. Documentation: Clear reporting is as important as technical fixes



================================================================================

AUTHOR

================================================================================



Laiba Rana

Cybersecurity Intern

April 2026

GitHub: laiba1305



================================================================================



"Security is not a product, but a process." - Bruce Schneier

