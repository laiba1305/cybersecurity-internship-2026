/**
 * Simple Web Application Firewall (WAF) Middleware
 * Blocks common attack patterns
 */

// SQL Injection patterns
const sqlPatterns = [
    /(\%27)|(\')|(\-\-)|(\%23)|(#)/i,  // SQL comments and quotes
    /((\%3D)|(=))[^\n]*((\%27)|(\')|(\-\-)|(\%3B)|(;))/i,  // '= something'
    /\w*((\%27)|(\'))((\%6F)|o|(\%4F))((\%72)|r|(\%52))/i,  // 'or' pattern
    /((\%27)|(\'))\s*union/i,  // UNION attacks
    /exec(\s|\+)+(s|x)p\w+/i,  // Stored procedure attacks
    /UNION\s+SELECT/i  // UNION SELECT
];

// XSS patterns
const xssPatterns = [
    /<script\b[^>]*>([\s\S]*?)<\/script>/i,  // <script> tags
    /javascript:/i,  // javascript: protocol
    /on\w+\s*=/i,  // onerror=, onload=, etc.
    /<img[^>]+src[^>]+onerror/i,  // img onerror
    /<iframe/i,  // iframe injection
    /<object/i,  // object injection
    /<embed/i  // embed injection
];

// Path traversal patterns
const pathPatterns = [
    /\.\.\//,  // ../
    /\.\.\\/,  // ..\
    /%2e%2e%2f/i,  // encoded ../
    /etc\/passwd/i,  // Linux password file
    /cmd\.exe/i,  // Windows command
    /\/bin\//i  // Linux binaries
];

// WAF Middleware
const wafMiddleware = (req, res, next) => {
    const url = req.url;
    const body = JSON.stringify(req.body);
    const params = JSON.stringify(req.query);
    const fullRequest = `${url} ${body} ${params}`;
    
    // Check SQL injection patterns
    for (const pattern of sqlPatterns) {
        if (pattern.test(fullRequest)) {
            console.warn(`[WAF] SQL Injection blocked: ${pattern} in ${url}`);
            return res.status(403).json({ 
                error: 'Request blocked by WAF',
                reason: 'SQL Injection pattern detected'
            });
        }
    }
    
    // Check XSS patterns
    for (const pattern of xssPatterns) {
        if (pattern.test(fullRequest)) {
            console.warn(`[WAF] XSS blocked: ${pattern} in ${url}`);
            return res.status(403).json({ 
                error: 'Request blocked by WAF',
                reason: 'XSS pattern detected'
            });
        }
    }
    
    // Check path traversal patterns
    for (const pattern of pathPatterns) {
        if (pattern.test(fullRequest)) {
            console.warn(`[WAF] Path traversal blocked: ${pattern} in ${url}`);
            return res.status(403).json({ 
                error: 'Request blocked by WAF',
                reason: 'Path traversal detected'
            });
        }
    }
    
    next();
};

module.exports = wafMiddleware;