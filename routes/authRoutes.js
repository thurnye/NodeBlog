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
      res.redirect('http://localhost:3000/')
    }
  );

  app.get('/auth/logout', (req, res) => {
    req.logout();
    // res.redirect('/');
    res.redirect('http://localhost:3000/')
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
