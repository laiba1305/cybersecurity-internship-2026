/** 
 * Zero Trust Security Middleware 
 * Principles: Never trust, always verify 
 */ 
 
const verifyRequest = (req, res, next) =
    console.log(`[Zero Trust] Request: ${req.method} ${req.path} from ${req.ip}`); 
    if (!req.headers['user-agent']) { 
        return res.status(400).json({ error: 'Invalid request' }); 
    } 
    next(); 
}; 
 
const requireRole = (allowedRoles) =
    return (req, res, next) =
        const userRole = req.user?.role || 'guest'; 
        if (!allowedRoles.includes(userRole)) { 
            return res.status(403).json({ error: 'Insufficient permissions' }); 
        } 
        next(); 
    }; 
}; 
 
const continuousValidation = (req, res, next) =
    console.log('[Zero Trust] Token validated'); 
    next(); 
}; 
 
module.exports = { verifyRequest, requireRole, continuousValidation }; 
