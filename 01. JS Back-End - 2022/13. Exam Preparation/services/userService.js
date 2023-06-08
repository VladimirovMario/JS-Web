const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const jwtSecret = "Secret for exam :)";


async function register(username, password) {

  const existing = await User.findOne({username}).collation({locale: 'en', strength: 2});

  if (existing) {
    throw new Error("Username is taken");
  }
 
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    hashedPassword
  })

  const token = createSession(user);
  return token;  
}


async function login(username, password) {
  
  const user = await User.findOne({username}).collation({locale: 'en', strength : 2});
  // We can use: .collation({locale: 'en', strength: 2})
  // If we have made index.
  // Otherwise we use regex.
  // const user = await User.findOne({username: {$regex: new RegExp(username), $options: 'i'}});
  if (!user) {
    throw new Error('Incorrect username or password')
  }

  const match = await bcrypt.compare(password, user.hashedPassword);

  if (!match) {
    throw new Error('Incorrect username or password');
  }

  console.log('>>> From userService login(user) >>>', user);

  const token = createSession(user);
  return token;
}


function createSession(user) {
  // View model
    const payload = {
        _id: user._id,
        username: user.username
    }

    const token = jwt.sign(payload, jwtSecret, {expiresIn: '1d'});
    return token;
}

function verifyToken(token) {
  return jwt.verify(token, jwtSecret);
}

module.exports = {
  login,
  register,
  verifyToken,
};
