/**
 * Role-Based Access Control Middleware
 */

// Middleware to check if user is authenticated
export function isAuthenticated(req, res, next) {
  if (req.session && req.session.admin) {
    return next();
  }
  return res.status(401).json({ 
    success: false, 
    message: 'Authentication required' 
  });
}

// Middleware to check if user is admin (not subadmin)
export function isAdmin(req, res, next) {
  if (req.session && req.session.admin) {
    if (req.session.admin.role === 'admin') {
      return next();
    }
    return res.status(403).json({ 
      success: false, 
      message: 'Admin access required. Sub-admins cannot perform this action.' 
    });
  }
  return res.status(401).json({ 
    success: false, 
    message: 'Authentication required' 
  });
}

// Middleware to check specific permission
export function hasPermission(permissionKey) {
  return (req, res, next) => {
    if (!req.session || !req.session.admin) {
      return res.status(401).json({ 
        success: false, 
        message: 'Authentication required' 
      });
    }

    const user = req.session.admin;

    // Admins have all permissions
    if (user.role === 'admin') {
      return next();
    }

    // Check if subadmin has the specific permission
    if (user.permissions && user.permissions[permissionKey]) {
      return next();
    }

    return res.status(403).json({ 
      success: false, 
      message: `Permission denied. You don't have '${permissionKey}' permission.` 
    });
  };
}

// Middleware to check if user can view analytics
export function canViewAnalytics(req, res, next) {
  if (!req.session || !req.session.admin) {
    return res.status(401).json({ 
      success: false, 
      message: 'Authentication required' 
    });
  }

  const user = req.session.admin;

  // Admins can view analytics
  if (user.role === 'admin') {
    return next();
  }

  // Subadmins cannot view analytics (per requirement)
  return res.status(403).json({ 
    success: false, 
    message: 'Access denied. Only administrators can view analytics.' 
  });
}

// Middleware to check if user can delete resources
export function canDelete(resourceType) {
  return (req, res, next) => {
    if (!req.session || !req.session.admin) {
      return res.status(401).json({ 
        success: false, 
        message: 'Authentication required' 
      });
    }

    const user = req.session.admin;

    // Only admins can delete
    if (user.role === 'admin') {
      return next();
    }

    return res.status(403).json({ 
      success: false, 
      message: `Only administrators can delete ${resourceType}.` 
    });
  };
}
