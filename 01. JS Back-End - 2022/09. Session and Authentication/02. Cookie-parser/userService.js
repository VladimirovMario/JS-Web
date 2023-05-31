const fs = require('fs')
const bcrypt = require("bcrypt");

/*
{
    username: (String),
    hashedPassword: (String),
    failedAttempts: (Number),
    role: 'user' | 'admin'
}
*/

const users = JSON.parse(fs.readFileSync('./users.txt'));

async function register(username, password) {
  if (users.find((u) => u.username.toLowerCase() == username.toLowerCase())) {
    throw new Error("Username is taken.");
  }

  const user = {
    username,
    hashedPassword: await bcrypt.hashSync(password, 10),
    failedAttempts : 0,
    role: ['user']
  };

  users.push(user);
  await new Promise(res => fs.writeFile('./users.txt', JSON.stringify(users, null, 2) , res))
}

async function login(username, password) {
    const user = users.find((u) => u.username.toLowerCase() == username.toLowerCase())

    if(user){
      if (user.failedAttempts >= 2){
        throw new Error('User profile is lock. Please contact admins');
      }
      const success = await bcrypt.compare(password, user.hashedPassword);
      if (success) {
        user.failedAttempts = 0;
        return user;
      } else {
        user.failedAttempts++;
        throw new Error('Username or password is incorrect.');
      }
    } else {
      throw new Error('Username or password is incorrect');
    }

}
module.exports = {
  users,
  register,
  login,
};
