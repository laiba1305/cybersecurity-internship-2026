\# Weeks 1-3: Security Assessment \& Basic Hardening Report

\*\*Intern:\*\* Laiba Rana | \*\*Date:\*\*March 2026



\---



\## Executive Summary



Completed vulnerability assessment on OWASP Juice Shop followed by implementation of basic security controls.



\### Vulnerabilities Discovered

\- Reflected XSS (HIGH) - Search bar

\- SQL Injection (CRITICAL) - Login bypass

\- Cookie Exposure (HIGH) - Via XSS

\- Missing Security Headers (MEDIUM)



\### Security Measures Implemented

\- Input validation (validator.js)

\- Password hashing (bcrypt)

\- JWT authentication

\- Security headers (Helmet.js)

\- Logging (Winston)



\### Verification

All discovered vulnerabilities were successfully remediated in the secure API (port 4000).



\*\*Evidence:\*\* See `screenshots/` folder and `findings.md`

