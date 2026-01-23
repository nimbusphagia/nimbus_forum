import 'dotenv/config'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import homeRouter from './src/routes/home.js';
import signupRouter from './src/routes/sign-up.js';
import { loginRouter } from './src/routes/login.js';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import { pool } from './src/database/pool.js';
import passport from 'passport';
import { Strategy } from 'passport-local';
import { getUserById, getUserByEmail } from './src/database/queries.js';
import bcrypt from 'bcrypt';
import logoutRouter from './src/routes/logout.js';


// App setup
const app = express();
const _dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(_dirname, 'public')));
app.set('views', path.join(_dirname, 'src/views'));
app.set('view engine', 'pug');

// Session setup
const pgSession = connectPgSimple(session);
const sessionStore = new pgSession({
  pool: pool,
})
app.use(session({
  secret: process.env.SECRET,
  store: sessionStore,
  name: 'sid',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
  }
}));

// Passport setup
async function verify(username, password, done) {
  try {
    const user = await getUserByEmail(username);
    if (!user) {
      return done(null, false, { message: "User not found" });
    }
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (isValid) {
      return done(null, user);
    }
    return done(null, false, { message: "Wrong password" });
  } catch (err) {
    return done(err);
  }
}
const localStrategy = new Strategy(verify);
passport.use(localStrategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (userId, done) => {
  try {
    const user = await getUserById(userId);
    done(null, user);
  } catch (err) {
    done(err);
  }
})

//app.use(passport.initialize());
app.use(passport.session());

// Routes

app.use(homeRouter);
app.use(signupRouter);
app.use(loginRouter);
app.use(logoutRouter);

// Error catching middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;

  console.error(err);

  res.status(status).json({
    error: {
      message: err.expose ? err.message : 'Internal Server Error',
    },
  });
});


// Server start
const server = app.listen(process.env.PORT, () => {
  console.log('Server listening on port', process.env.PORT);
});

server.on('error', (err) => {
  console.error('Server failed to start:', err);
  process.exit(1);
});

