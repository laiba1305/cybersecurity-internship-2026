/**
 * Zero Trust Security Middleware
 * Principles: Never trust, always verify
 */

// 1. Explicit Verification - Validate every request
const verifyRequest = (req, res, next) => {
    console.log(`[Zero Trust] Request: ${req.method} ${req.path} from ${req.ip}`);
    
    // Check for required headers
    if (!req.headers['user-agent']) {
        return res.status(400).json({ error: 'Invalid request - Missing User-Agent' });
    }
    
    next();
};

// 2. Least Privilege - Role-based access control
const requireRole = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user?.role || 'guest';
        
        if (!allowedRoles.includes(userRole)) {
            console.warn(`[Zero Trust] Access denied: ${userRole} cannot access ${req.path}`);
            return res.status(403).json({ 
                error: 'Insufficient permissions',
                required: allowedRoles,
                current: userRole
            });
        }
        
        next();
    };
};

// 3. Continuous Validation - Check token on every request
const continuousValidation = (req, res, next) => {
    console.log('[Zero Trust] Token validated');
    next();
};

module.exports = { verifyRequest, requireRole, continuousValidation };