const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
require('dotenv').config();

const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./models/Blog');
require('./services/passport');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

//https://stackoverflow.com/questions/72375564/typeerror-req-session-regenerate-is-not-a-function-using-passport
// register regenerate & save after the cookieSession middleware initialization
// app.use(function(request, response, next) {
//   console.log(request.session)
//   if (request.session && !request.session.regenerate) {
//       request.session.regenerate = (cb) => {
//           cb()
//       }
//   }
//   if (request.session && !request.session.save) {
//       request.session.save = (cb) => {
//           cb()
//       }
//   }
//   next()
// })

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/blogRoutes')(app);

if (['production'].includes(process.env.NODE_ENV)) {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});
