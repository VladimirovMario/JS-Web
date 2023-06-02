const authController = require("express")();

const { login, register } = require("../services/authService");

authController.get("/login", (req, res) => {
  res.render("login", {
    title: "Login",
  });
});

authController.post("/login", async (req, res) => {

  try {
    const result = await login(req.body.username.trim(), req.body.password.trim());
    attachToken(req, res, result);
    
    console.log("From authController.post(/login, token:", result);
    res.redirect("/");
  } catch (error) {
    console.log('>>> From login error >>>', error);
    console.log('>>> error.message >>>', error.message);

    res.render('login', {
      title: 'Login',
      error: error.message.split('\n')
    });
    
  }

});

authController.get("/register", (req, res) => {
  res.render("register", {
    title: "Register",
  });
});

authController.post("/register", async (req, res) => {

  try {
    if (req.body.username.trim() == '' || req.body.password.trim() == '') {
      throw new Error('All fields are required!');
    }
    if (req.body.password.trim() != req.body.repass.trim()){
      throw new Error('Passwords don\'t match!');
    }
    const result = await register(req.body.username.trim(), req.body.password.trim());
    attachToken(req, res, result);
    
    
    console.log("From authController.post(/login", result);
    res.redirect("/");
  } catch (error) {

    console.log('>>> From register error >>>', error);
    console.log('>>> error.message >>>', error.message);

    res.render('register', {
      title: 'Register',
      error: error.message.split('\n')
    });
  }
});

function attachToken(req, res, data) {
  const token = req.signJwt(data);
  res.cookie("jwt", token, { maxAge: 14400000 });
}

authController.get("/logout",  (req, res) => {

  console.log('>>> From authController.get("/logout">>> ');
  
  res.clearCookie('jwt');
   return res.redirect('/');
})

module.exports = authController;
