const isAuthenticated = require('../middleware/isAuthenticated');

router.get('/logout', isAuthenticated, (res, req,next ) => {
    req.session.destroy((err) => {
        if(err){
            console.log('Error destroying session:', err);
            return res.status(500).send('there was an error');
        }
        res.redirect('/');
    });
});

module.exports = router;