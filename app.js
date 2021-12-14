import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import methodOverride from 'method-override';

// eslint-disable-next-line import/extensions
import defRouter from './routes/index.js';
// eslint-disable-next-line import/extensions
// import config from './config/config.js';
// eslint-disable-next-line import/extensions
import authenticate from './config/passport.js';

mongoose.connect(
  `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.rd7qo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true },
// eslint-disable-next-line no-console
).then(() => console.log('connected')).catch((e) => console.log('connection failure\n', e));

const app = express();

const port = 8080 || process.env.PORT;

authenticate(passport);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(passport.initialize());
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: session.sessionStore,
  // TODO: for production set secure to true
  cookie: {
    secure: true,
  },
}));
app.use(passport.session());
app.use('/', defRouter);
app.use(methodOverride('_method'));
app.use(express.static(`${__dirname}/static`));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port :>> ', port);
});
