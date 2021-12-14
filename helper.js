import bcrypt from 'bcrypt';

export async function generateHash(password) {
  const saltRounds = 10;
  return bcrypt.hash(password.toString(), saltRounds);
}

export async function checkPassword(password, hashedPassword) {
  return bcrypt.compare(password.toString(), hashedPassword);
}

export function checkIfAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/');
}

export function checkIfNotAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/dashboard');
}
