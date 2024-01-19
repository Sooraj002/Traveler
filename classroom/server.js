const express = require("express");
const app = express();
const users = require("./routes/user");
const post = require("./routes/posts");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

// const cookieParser = require("cookie-parser");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true
}

app.use(session(sessionOptions));
app.use(flash());

app.get("/register", (req, res) => {
    let { name = "anonymous" } = req.query;
    req.session.name = name;
    if (name === "anonymous") {
        req.flash('error', "user not registered");
    } else {
        req.flash('success', "user registered successfully")
    }
    // console.log(req.session.name)
    res.redirect("/hello");
})

app.get("/hello", (req, res) => {
    // console.log(req.flash('success'));
    res.locals.successMsg = req.flash('success');
    res.locals.errorMsg = req.flash('error');
    res.render("page.ejs", { name: req.session.name });
});

app.get("/reqcount", (req, res) => {
    if (req.session.count) {
        req.session.count++;
    } else {
        req.session.count = 1;
    }
    res.send(`you send a request ${req.session.count} times`)
})
app.listen(3000, () => {
    console.log("server is listening to port 3000");
})