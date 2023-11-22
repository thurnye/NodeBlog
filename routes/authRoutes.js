const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      // console.log('redirecting....')
      // res.redirect('/blogs');
      res.redirect(process.env.SITE_URL)
    }
  );

  app.get('/auth/logout', (req, res) => {
    req.logout();
    // res.redirect('/');
    res.redirect(process.env.SITE_URL)
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
