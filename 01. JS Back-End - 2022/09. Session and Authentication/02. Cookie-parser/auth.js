const express = require("express");
const app = express();
const session = require("express-session");
const { register, login, users } = require("./userService");

// Middleware Form data parser
app.use(express.urlencoded({ extended: false }));
// Middleware cross-cutting concern
app.use(
  session({
    // When set to true must be use with https//: cookie: {secure: true }
    cookie: { secure: false },
    resave: false,
    saveUninitialized: true,
    secret: "my secret code",
  })
);

const homeTemplate = (user, users, isAdmin) =>`<h1>Welcome, ${user || 'guest'}</h1>
 ${user == undefined ? `<p>Please <a href="/login">login here.</a></p><p>If you don\`n have an account please <a href="/register">register here.</a></p>` : ``}
  ${isAdmin ?
  `<ul>
  ${users.map(u => `<li>${u.username} - ${u.failedAttempts} <a href="/reset?username=${u.username}">Reset</a></li>`).join('\n')}
  </ul>`
  : ``}
` 

app.get("/", (req, res) => {
  let user = {};
  if(req.session.user){
  user = users.find( u => u.username.toLowerCase() == req.session.user.toLowerCase());
  }
  console.log(">>> User: " + (user.username || "guest"));

  res.send(homeTemplate(user.username, users, (user.role || []).includes('admin')));
});

app.get("/reset", (req, res) => {
  let user = {};

  if(req.session.user){
  user = users.find( u => u.username.toLowerCase() == req.session.user.toLowerCase());
  }
  if ((user.role || []).includes('admin') == false) {
    return res.status(403).send('403 Forbidden');
  }
  const target = users.find( u => u.username.toLowerCase() == req.query.username.toLowerCase());
  target.failedAttempts = 0;
  res.redirect('/');
})

const registerTemplate = (error) => `<h1>Register</h1>
${error ? `<p>${error}</p>` : ""}
<form action="/register" method="post">
<label for="">Username <input type="username" name="username"></label>
<label for="">Password <input type="password" name="password"></label>
<label for="">Repeat Password <input type="password" name="repass"></label>
<input type="submit" value="Sign up">
</form>`;

app.get("/register", (req, res) => {
  res.send(registerTemplate());
});

app.post("/register", async (req, res) => {
  try {
    if (req.body.password.trim() == "" || req.body.repass.trim() == "") {
      throw new Error("All fields are required!");
    } else if (req.body.password != req.body.repass) {
      throw new Error("Passwords don't match!");
    }

    await register( req.body.username.trim(), req.body.password.trim() );
    res.redirect("/");
  } catch (error) {
    res.send(registerTemplate(error.message));
  }
});


const loginTemplate = (error) => `<h1>Login</h1>
${error ? `<p>${error}</p>` : ""}
<form action="/login" method="post">
<label for="">Username <input type="username" name="username"></label>
<label for="">Password <input type="password" name="password"></label>
<input type="submit" value="Log in">
</form>
`

app.get("/login", (req, res) => {
  res.send(loginTemplate());
});

app.post("/login", async (req, res) => {
  console.log("Login attempt");

  try {
    const result = await login(req.body.username, req.body.password)
    req.session.user = result.username;
    res.redirect("/");
  } catch (error) {
    res.status(401).send(loginTemplate(error.message))
  }
});

app.get('/getAdmin', (req, res )=>{

  const user = users.find( u => u.username.toLowerCase() == req.session.user.toLowerCase())
  user.role.push('admin')
  
  console.log('From /getAdmin', user);
  res.redirect('/')
})

app.listen(3000);
