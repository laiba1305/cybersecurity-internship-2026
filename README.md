# 🔒 Cybersecurity Internship Project 2026
## OWASP Juice Shop Security Assessment & Hardening (Weeks 4-6)

**Intern:** Laiba Rana  
**GitHub:** [laiba1305](https://github.com/laiba1305)  
**Deadline:** April 14, 2026  
**Environment:** Windows 11 | Docker | Node.js v24.14.1

---

## 📋 Project Overview

This repository contains the complete security assessment, hardening implementation, and penetration testing of OWASP Juice Shop as part of the cybersecurity internship program. All tasks from Weeks 4-6 are documented with code, configurations, and audit reports.

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/laiba1305/cybersecurity-internship-2026.git
cd cybersecurity-internship-2026

# Install dependencies
cd secure-api
npm install

# Start the secure API
npm start
Services:

Service	URL	Purpose
OWASP Juice Shop	http://localhost:3000	Vulnerable test application
Secure API	http://localhost:4000	Hardened Express API
DVWA	http://localhost:8080	Additional test target
📁 Repository Structure
text
secure-api/                  Week 4: Hardened Express API
├── server.js                Main server with all security features
├── package.json             Dependencies
├── .env.example             Environment variables template
└── middleware/              Security middleware

fail2ban/                    Week 4: Intrusion Detection
├── config/
│   └── jail.local           Fail2Ban jail configuration
└── filter.d/                Log filters for Juice Shop and DVWA

reports/                     All scan reports
├── week5/                   SQLMap, Nmap, Nikto outputs
└── week6/                   Final audit report, ZAP scan, Docker scan

docker-compose.yml           All services configuration
README.md                    This file
🛡️ Week 4: Advanced Threat Detection and API Security
✅ Tasks Completed
Intrusion Detection: Fail2Ban with custom filters

Real-time Alerting: Slack webhook and Email notifications

Rate Limiting: express-rate-limit (100 requests per 15 minutes)

CORS Configuration: Restricted to localhost:3000 and localhost:8080

API Key Authentication: X-API-Key header validation

JWT Authentication: jsonwebtoken with 24 hour expiry

CSP Header: Content-Security-Policy via Helmet

HSTS Header: Strict-Transport-Security enforced

🔑 Test Credentials
Service	Email	Password	API Key
Secure API	admin@juice-sh.op	[See .env.example]	[See .env.example]
📊 API Endpoints
Endpoint	Method	Auth Required	Description
/health	GET	None	Security status check
/api/auth/login	POST	None	JWT login
/api/auth/register	POST	None	User registration
/api/profile	GET	JWT	Protected profile
/api/internal/stats	GET	API Key	Internal metrics
/api/csrf-token	GET	None	Get CSRF token
/api/update-profile	POST	JWT + CSRF	Protected update
🐱‍💻 Week 5: Ethical Hacking and Exploitation
✅ Tasks Completed
Reconnaissance: Nmap, Nikto, Gobuster

SQL Injection Discovery: SQLMap on /rest/products/search

SQL Injection Prevention: Parameterized queries (Sequelize ORM)

CSRF Protection: csurf middleware

CSRF Testing: curl and Burp Suite

🔍 Key Finding - SQL Injection
Endpoint: /rest/products/search?q=

Type: Boolean-based blind SQL injection

Payload: test%' AND 7919=7919 AND 'ABMb%'='ABMb

Database: SQLite

Severity: CRITICAL

🔧 Remediation (Before vs After)
VULNERABLE CODE:

javascript
const query = "SELECT * FROM Products WHERE name LIKE '%" + req.query.q + "%'";
SECURE CODE (Parameterized Query):

javascript
const products = await Product.findAll({
    where: { name: { [Op.like]: '%' + req.query.q + '%' } }
});
🔐 CSRF Protection Test Results
Test	Request	Response
Without CSRF Token	POST /api/update-profile	403 Forbidden
With Valid CSRF Token	POST + csrf-token header	200 Success
📊 Week 6: Security Audits and Final Deployment
✅ Tasks Completed
Automated Scanning: OWASP ZAP

Web Server Scan: Nikto

Port Scanning: Nmap

Container Security: Docker Scout

Compliance Check: OWASP Top 10

Final Penetration Test: Burp Suite

📈 Vulnerability Summary
Vulnerability	Initial Severity	Final Status	Remediation
SQL Injection (Login)	CRITICAL	✅ FIXED	Parameterized queries
SQL Injection (Search)	CRITICAL	✅ FIXED	ORM parameterization
Reflected XSS	HIGH	✅ FIXED	CSP + Output encoding
Cookie Exposure	HIGH	✅ FIXED	HttpOnly flags
Missing CSP	MEDIUM	✅ FIXED	Helmet CSP
Missing HSTS	MEDIUM	✅ FIXED	Helmet HSTS
CORS Wildcard	MEDIUM	✅ FIXED	Origin whitelist
No Rate Limiting	MEDIUM	✅ FIXED	express-rate-limit
CSRF Vulnerability	MEDIUM	✅ FIXED	csurf tokens
🏆 OWASP Top 10 Compliance (10/10 - 100%)
Category	Status	Implementation
A01: Broken Access Control	✅	JWT + API Keys
A02: Cryptographic Failures	✅	bcrypt hashing
A03: Injection	✅	Parameterized queries
A04: Insecure Design	✅	Rate limiting + CSRF
A05: Security Misconfiguration	✅	Helmet headers
A06: Vulnerable Components	✅	npm audit fixed
A07: Auth Failures	✅	JWT + login limits
A08: Software Integrity	✅	Docker Scout
A09: Logging Failures	✅	Winston logger
A10: SSRF	✅	Input validation
🐳 Docker Services
Service	Port	Container	Purpose
Juice Shop	3000	juice-shop	Vulnerable test app
Secure API	4000	secure-api	Hardened Express API
DVWA	8080	dvwa	Additional test target
Kali Linux	-	kali-pentest	Penetration testing
OWASP ZAP	8090	owasp-zap	Security scanning
Fail2Ban	-	fail2ban	Intrusion detection
🧪 Testing the Security Features
Test Rate Limiting:
bash
for i in {1..110}; do curl -s http://localhost:4000/health; done
# Expected: HTTP 429 Too Many Requests
Test API Key Authentication (without key):
bash
curl http://localhost:4000/api/internal/stats
# Expected: {"error":"Invalid API key"}
Test API Key Authentication (with key):
bash
curl -H "X-API-Key: [See .env.example]" http://localhost:4000/api/internal/stats
# Expected: {"message":"Internal API accessed with API key",...}
Test CSRF Protection:
bash
curl http://localhost:4000/api/csrf-token
curl -X POST http://localhost:4000/api/update-profile -H "Authorization: Bearer [JWT]" -d "name=test"
# Expected: {"error":"Invalid CSRF token"}
📚 Technologies Used
Category	Technologies
Backend	Node.js, Express
Security	Helmet, CORS, rate-limit, JWT, bcrypt, csurf
Testing	Kali Linux, SQLMap, Nmap, Nikto, OWASP ZAP, Burp Suite
Monitoring	Fail2Ban, Winston
Containerization	Docker, Docker Compose, Docker Scout
Version Control	Git, GitHub
📝 Key Learnings
Defense in Depth: Multiple security layers provide comprehensive protection

Ethical Hacking: Understanding attack vectors is essential for defense

OWASP Top 10: Industry standard framework for web application security

Automation: Security scanning tools catch vulnerabilities humans might miss

Documentation: Clear reporting is as important as technical fixes

👤 Author
Laiba Rana
Cybersecurity Intern
April 2026
GitHub: @laiba1305

"Security is not a product, but a process." — Bruce Schneier
