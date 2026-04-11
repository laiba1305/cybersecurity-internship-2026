# Bonus Challenges Report
**Intern:** Laiba Rana
**Date:** April 2026

## Overview
Three optional bonus challenges were completed to demonstrate advanced security concepts beyond the core curriculum:
1. Zero Trust Security Middleware
2. Web Application Firewall (WAF)
3. Social Engineering - Phishing Simulation

---

## Bonus 1: Zero Trust Security Middleware

### Implementation
**File:** `secure-api/middleware/zero-trust.js`

A custom middleware enforcing "never trust, always verify" on all non-public routes.

### Verification
| Test | Request | Result |
|------|---------|--------|
| No credentials | GET /api/profile | 401 - Blocked |
| Valid JWT | GET /api/profile + Auth header | 200 - Allowed |
| Valid API Key | GET /api/internal/stats + X-API-Key | 200 - Allowed |
| Public route | GET /health | 200 - Allowed |

### Principles Applied
- Verify Explicitly: Every request requires JWT or API key.
- Least Privilege: Routes scoped to minimum required access.
- Assume Breach: All access logged.
- Contextual Validation: Origin header checked.

---

## Bonus 2: Web Application Firewall (WAF)

### Implementation
**File:** `secure-api/middleware/waf.js`

A custom middleware inspecting all requests and blocking common attack patterns before application logic.

### Detection Rules
| Category | Patterns | Count |
|----------|----------|-------|
| SQL Injection | Comments, UNION, stored procedures, encoded payloads | 6 |
| XSS | Script tags, event handlers, iframe, object, embed | 7 |
| Path Traversal | Unix/Windows paths, encoded variants | 6 |
| **Total** | | **19** |

### Verification
| Attack Type | Payload | Result |
|-------------|---------|--------|
| SQL Injection | `q=1' OR 1=1--` | 403 - Blocked |
| XSS | `name=<script>alert(1)</script>` | 403 - Blocked |
| Path Traversal | `file=../../etc/passwd` | 403 - Blocked |
| Legitimate | `q=juice` | 200 - Allowed |

---

## Bonus 3: Social Engineering - Phishing Simulation

### Overview
A controlled phishing simulation using GoPhish and MailHog in an isolated Docker environment. No real user data was collected.

### Setup
- **Platform:** GoPhish (phishing framework)
- **Email Server:** MailHog (isolated test server)
- **Target:** 1 test user (test@company.com)

### Campaign Configuration
| Parameter | Value |
|-----------|-------|
| Campaign Name | Security Awareness Test - April 2026 |
| Email Subject | ACTION REQUIRED: Your password expires in 24 hours |
| Sender | security@company.com (spoofed) |
| Landing Page | Fake Office 365 login |

### Results
| Metric | Value |
|--------|-------|
| Emails Sent | 1 |
| Opened | 1 (100%) |
| Clicked | 1 (100%) |
| Credentials Submitted | 1 (100%) |
| Reported | 0 (0%) |

### Key Findings
- 100% end-to-end success rate.
- Urgency in subject line effective.
- Spoofed sender not questioned.
- Target did not report the email.

### Recommendations
- Deploy SPF, DKIM, DMARC.
- Implement phishing awareness training.
- Enforce MFA.
- Run quarterly simulations.

### Evidence
- `screenshots/mailhog-phishing-email.png`
- `screenshots/mailhog-email-details.png`
- `screenshots/gophish-campaign-dashboard.png`
- `Security Awareness Test - April 2026 - Results.csv`

---

## Conclusion
All three bonus challenges were successfully implemented, verified, and documented with evidence. The work demonstrates initiative beyond the core internship requirements.
