require("dotenv").config();

const express = require("express");
var cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");



const indexRouter = require("./routes/index");

const app = express();

// To support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// To parse cookies from the HTTP Request
app.use(cookieParser());



app.set("view engine", "html");
app.engine("html", require("hbs").__express);

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, "public")));
app.use(cors(corsOptions));

/** Import modul aplikasi sistem sesuai folder */
const authRoute = require("./routes/authentikasi/index");
const userRoute = require("./routes/user/index");


// nama route yang diinginkan
app.use("/", indexRouter);
app.use("/authentication", authRoute);
app.use("/user", userRoute);

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/register", (req, res) => {
  res.render("register");
});

const getPassword = (password) => {
  return password
}

const users = [
  // This user is added to the array to avoid creating a new user on each restart
  {
    firstName: "admin",
    lastName: "1",
    email: "admin@sdi.com",
    // This is the SHA256 hash for value of `password`
    password: "$2a$10$ObcRX0tXQrc3WAJETiGBNeOkRNE.FplPhmY3bVjR4RrVo36ThgOim",
  },
];

app.post("/register", (req, res) => {
  const { email, firstName, lastName, password, confirmPassword } = req.body;

  // Check if the password and confirm password fields match
  if (password === confirmPassword) {
    // Check if user with the same email is also registered
    if (users.find((user) => user.email === email)) {
      res.render("register", {
        message: "User already registered.",
        messageClass: "alert-danger",
      });

      return;
    }

    const Password = getPassword;

    // Store user into the database if you are using one
    users.push({
      firstName,
      lastName,
      email,
      password: Password,
    });

    res.render("login", {
      message: "Registration Complete. Please login to continue.",
      messageClass: "alert-success",
    });
  } else {
    res.render("register", {
      message: "Password does not match.",
      messageClass: "alert-danger",
    });
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

const authLogins = {};

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const Password = getPassword;

  const user = users.find((u) => {
    return u.email === email && Password === u.password;
  });

  if (user) {
    const authLogin = password();

    // Store authentication token
    authLogins[authLogin] = user;

    // Setting the auth token in cookies
    // res.cookie("AuthToken", authToken);

    // Redirect user to the protected page
    res.redirect("/secret");
  } else {
    res.render("login", {
      message: "Invalid username or password",
      messageClass: "alert-danger",
    });
  }
});

app.get("/secret", (req, res) => {
  if (req.user) {
    res.render("secret");
  } else {
    res.render("login", {
      message: "Please login to continue",
      messageClass: "alert-danger",
    });
  }
});

app.listen(3000);
// module.exports = app;


