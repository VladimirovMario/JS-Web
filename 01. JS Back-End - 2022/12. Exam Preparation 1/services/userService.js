const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const jwtSecret = "Secret for exam :)";

// TODO check the assignment
async function register(email, username, password) {
  // username: John , password: 123
  // add email field and check for error
  const existingUsername = await User.findOne({username}).collation({locale: 'en', strength: 2});
  if (existingUsername) {
    throw new Error("Username is taken");
  }

  const existingEmail = await User.findOne({email}).collation({locale: 'en', strength: 2});
  if (existingEmail) {
    throw new Error("Email is taken");
  }
 

  const hashedPassword = await bcrypt.hash(password, 10);

// TODO check the assignment
  const user = await User.create({
    email,
    username,
    hashedPassword
  })

  const token = createSession(user);
  return token;
  
}

// TODO check the assignment
async function login(email, password) {
  const user = await User.findOne({email}).collation({locale: 'en', strength : 2});
  // We can use: .collation({locale: 'en', strength: 2})
  // If we have made index.
  // Otherwise we use regex.
  // const user = await User.findOne({username: {$regex: new RegExp(username), $options: 'i'}});
  if (!user) {
    throw new Error('Incorrect email or password')
  }

  const match = await bcrypt.compare(password, user.hashedPassword);

  if (!match) {
    throw new Error('Incorrect email or password');
  }
 console.log('>>> From async function login USER:', user);
  const token = createSession(user);
  return token;
}


function createSession(user) {
  // View model
    const payload = {
        email: user.email,
        _id: user._id,
        username: user.username
    }

    const token = jwt.sign(payload, jwtSecret,  {expiresIn: '1d'});
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
