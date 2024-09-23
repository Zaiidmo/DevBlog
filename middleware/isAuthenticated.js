const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
      // User is authenticated, proceed to the next middleware or route handler
      return next();
    }
    // User is not authenticated, redirect to login page
    res.redirect('/auth/login');
  };
  
  module.exports = isAuthenticated;