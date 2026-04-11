# Week 5: Ethical Hacking & Exploitation Report

**Date:** April 2026  
**Intern:** Laiba Rana  
**Target:** OWASP Juice Shop (localhost:3000) | Secure API (localhost:4000)

---

## Executive Summary

Week 5 focused on ethical hacking techniques including reconnaissance, SQL injection discovery with SQLMap, and CSRF protection implementation. Critical vulnerabilities were found in Juice Shop and successfully remediated in the secure API.

---

## 1. Reconnaissance

### 1.1 Nmap Port Scan
```bash
nmap -sV -p 3000 localhost
Results:

Port	State	Service	Version
3000	open	http	Node.js Express
File: reports/week5/nmap-scan.txt

1.2 Nikto Web Vulnerability Scan
bash
nikto -h http://localhost:3000
Key Findings:

Finding	Severity
Missing Content-Security-Policy header	MEDIUM
Missing Strict-Transport-Security header	MEDIUM
Access-Control-Allow-Origin: *	MEDIUM
/robots.txt exposed	INFO
Status: All findings remediated in secure API (Week 4)

2. SQL Injection Discovery & Exploitation
2.1 SQLMap Scan
bash
sqlmap -u "http://localhost:3000/rest/products/search?q=test" --batch --level=2 --dbs
Findings:

Attribute	Value
Vulnerable Parameter	q (GET)
Injection Type	Boolean-based blind
Backend DBMS	SQLite
Severity	CRITICAL
Payload:

text
test%' AND 7919=7919 AND 'ABMb%'='ABMb
Evidence: SQLMap output saved to reports/week5/sqlmap/

2.2 Hash Cracking (Weak Password Storage)
Hash Type	Status
MD5	Cracked in seconds
Passwords Found	admin123, demo, ncc-1701
Conclusion: MD5 is cryptographically broken. Passwords should use bcrypt.

3. SQL Injection Prevention
Vulnerable Code (Juice Shop)
javascript
const query = "SELECT * FROM Products WHERE name LIKE '%" + req.query.q + "%'";
Secure Code (Our API)
javascript
const products = await Product.findAll({
    where: { name: { [Op.like]: '%' + req.query.q + '%' } }
});
Status: ✅ Parameterized queries prevent SQL injection

4. CSRF Protection
4.1 Implementation
Component	Technology
Middleware	csurf
Token Type	Double-submit cookie
javascript
const csrfProtection = csrf({ cookie: true });
app.post('/api/update-profile', verifyToken, csrfProtection, (req, res) => {
    // Protected
});
4.2 Testing Results
Test	Request	Response
Without CSRF Token	POST with JWT only	403 Forbidden
With Valid Token	POST with JWT + csrf-token	200 Success
Status: ✅ CSRF protection verified

5. Tools Used
Tool	Purpose
Kali Linux (Docker)	Penetration testing environment
Nmap	Port scanning
Nikto	Web vulnerability scanning
SQLMap	Automated SQL injection
Hashcat	Password cracking
Burp Suite	Manual testing proxy
6. Vulnerability Summary
Vulnerability	Juice Shop (3000)	Secure API (4000)
SQL Injection	❌ CRITICAL	✅ FIXED
Weak Password Hashing	❌ MD5	✅ bcrypt
Missing CSP	❌ MEDIUM	✅ FIXED
Missing HSTS	❌ MEDIUM	✅ FIXED
CSRF	❌ VULNERABLE	✅ PROTECTED
7. Conclusion
All Week 5 tasks successfully completed:

✅ Reconnaissance with Nmap and Nikto

✅ SQL injection discovered with SQLMap

✅ SQLi prevented with parameterized queries

✅ CSRF protection implemented and verified

✅ All findings documented with evidence

The secure API is now protected against all discovered attack vectors.

*End of Week 5 Report - Laiba Rana | Cybersecurity Internship | April 2026*
