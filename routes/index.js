import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import passport from 'passport';

// eslint-disable-next-line import/extensions
import * as fs from 'fs';
// eslint-disable-next-line import/extensions
import User from '../schema/index.js';
// eslint-disable-next-line import/extensions
import { checkIfAuthenticated, checkIfNotAuthenticated, generateHash } from '../helper.js';

const router = express.Router();

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));
router.get('/', checkIfNotAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/login', checkIfNotAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

router.get('/register', checkIfNotAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/register.html'));
});

router.post('/register', async (req, res) => {
  const {
    name, email, password, confirmPassword,
  } = req.body;
  if ((!name || !email || !password || !confirmPassword)
    || (password !== confirmPassword)
    || (password.length < 6)) {
    return res.redirect('/register');
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.redirect('/register');
    }
    const newUser = new User({
      name,
      email,
    });
    newUser.password = await generateHash(password);
    console.log(await newUser.save());
  } catch (err) {
    console.log(err);
    return res.redirect('/register');
  }
  return res.redirect('/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
}));

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});

router.get('/dashboard', checkIfAuthenticated, (req, res) => {
  let file = fs.readFileSync(path.join(__dirname, '../public/dashboard.html'), 'utf8');
  file = file.replace(/{{name}}/, req.user.name);
  return res.send(file);
});

export default router;
