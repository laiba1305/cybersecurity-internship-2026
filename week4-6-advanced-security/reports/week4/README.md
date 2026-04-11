# \# Week 4: Advanced Threat Detection \& API Security Report

# 

# \*\*Date:\*\* April 2026  

# \*\*Intern:\*\* Laiba Rana  

# \*\*Target:\*\* Secure API (localhost:4000)

# 

# \---

# 

# \## Executive Summary

# 

# Week 4 focused on implementing advanced security measures including real-time intrusion detection with Fail2Ban and comprehensive API hardening. All security controls were successfully implemented and verified.

# 

# \---

# 

# \## 1. Intrusion Detection \& Monitoring (Fail2Ban)

# 

# \### Configuration

# | Component | File | Purpose |

# |-----------|------|---------|

# | Fail2Ban Jail | `fail2ban/config/jail.local` | Monitors failed login attempts |

# | Juice Shop Filter | `fail2ban/filter.d/juiceshop.conf` | Detects Juice Shop auth failures |

# | DVWA Filter | `fail2ban/filter.d/dvwa-login.conf` | Detects DVWA auth failures |

# 

# \### Rules Configured

# | Parameter | Value |

# |-----------|-------|

# | Max Retry | 5 attempts |

# | Find Time | 300 seconds (5 minutes) |

# | Ban Time | 600 seconds (10 minutes) |

# | Alert Method | Slack webhook / Email |

# 

# \### Verification

# ```bash

# sudo fail2ban-client status juiceshop

# \# Output: Currently banned: 1, Total banned: 3

