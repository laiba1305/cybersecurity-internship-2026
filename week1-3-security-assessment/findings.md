\# Week 1-3: Vulnerability Assessment Findings

\*\*Date:\*\* March, 2026

\*\*Tester:\*\* Laiba Rana

\*\*Target:\*\* OWASP Juice Shop (localhost:3000)



\---



\## 1. Reflected Cross-Site Scripting (XSS)



| Attribute | Value |

|-----------|-------|

| \*\*Location\*\* | Search Bar |

| \*\*Payload\*\* | `<img src=x onerror=alert('Laiba\_Test\_123')>` |

| \*\*Result\*\* | JavaScript executed - alert popup appeared |

| \*\*Severity\*\* | \*\*HIGH\*\* |

| \*\*OWASP Category\*\* | A03:2021 - Injection |



\*\*Impact:\*\* Attacker can execute arbitrary JavaScript in victim's browser, leading to session hijacking, cookie theft, and phishing.



\*\*Evidence:\*\* `screenshots/03-xss-alert-success.png`



\---



\## 2. SQL Injection - Authentication Bypass



| Attribute | Value |

|-----------|-------|

| \*\*Location\*\* | Login Page (Email Field) |

| \*\*Payload\*\* | `admin' OR '1'='1` |

| \*\*Result\*\* | Logged in as administrator without password |

| \*\*Severity\*\* | \*\*CRITICAL\*\* |

| \*\*OWASP Category\*\* | A03:2021 - Injection |



\*\*Impact:\*\* Complete authentication bypass, unauthorized admin access, potential full database compromise.



\*\*Evidence:\*\* `screenshots/05-admin-login-sqli.png`, `screenshots/06-admin-profile-access.png`



\---



\## 3. Cookie Exposure via XSS



| Attribute | Value |

|-----------|-------|

| \*\*Location\*\* | Search Bar |

| \*\*Payload\*\* | `<img src=x onerror=alert(document.cookie)>` |

| \*\*Result\*\* | Session cookie displayed in alert |

| \*\*Severity\*\* | \*\*HIGH\*\* |

| \*\*OWASP Category\*\* | A03:2021 - Injection |



\*\*Impact:\*\* Session hijacking leading to account takeover.



\*\*Evidence:\*\* `screenshots/04-cookie-exposure.png`



\---



\## 4. Missing Security Headers



| Header | Status | Risk |

|--------|--------|------|

| Content-Security-Policy | ❌ Missing | XSS attacks easier |

| Strict-Transport-Security | ❌ Missing | MITM attacks possible |



\*\*Severity:\*\* \*\*MEDIUM\*\*  

\*\*OWASP Category:\*\* A05:2021 - Security Misconfiguration



\---



\## 5. Error Handling Information Disclosure



| Attribute | Value |

|-----------|-------|

| \*\*Location\*\* | Login Form |

| \*\*Issue\*\* | Verbose error messages reveal application behavior |

| \*\*Severity\*\* | \*\*LOW\*\* |

| \*\*OWASP Category\*\* | A05:2021 - Security Misconfiguration |



\*\*Evidence:\*\* `screenshots/02-xss-login-attempt.png`



\---



\## Summary



| Vulnerability | Severity | Status |

|--------------|----------|--------|

| Reflected XSS | HIGH | ✅ Confirmed |

| SQL Injection | CRITICAL | ✅ Confirmed |

| Cookie Exposure | HIGH | ✅ Confirmed |

| Missing CSP/HSTS | MEDIUM | ✅ Confirmed |

| Error Handling | LOW | ✅ Confirmed |



\*\*Remediation:\*\* See Weeks 4-6 for complete security implementation.

