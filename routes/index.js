var express = require("express");
var router = express.Router();
const userModel = require("./users");
const taskModel = require("./task");
const passport = require("passport");
const LocalStrategy = require("passport-local");
passport.use(new LocalStrategy(userModel.authenticate()));
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/login", function (req, res, next) {
  res.render("login", { error: req.flash("error") });
});

router.post("/upload", async function (req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user,
  });

 
  const task = await taskModel.create({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    assignedTo: user._id,
  });

  user.tasks.push(task._id);

  await user.save();
  res.redirect("/profile");
});
router.post("/delete", async function (req, res, next) {
  const taskId = req.body.taskId;
  const deletedTask = await taskModel.findByIdAndDelete(taskId);
});

router.get("/profile", isLoggedIn, async function (req, res, next) {
  const user = await userModel
    .findOne({
      username: req.session.passport.user,
    })
    .populate("tasks");


  res.render("profile", { user });
});

router.get("/feed", isLoggedIn, async function (req, res, next) {
  const user = await userModel
    .findOne({
      username: req.session.passport.user,
    })
    .populate("tasks");

    const tasks = await taskModel.find().populate("assignedTo")
  res.render("feed", { footer:true,user,tasks});
});

router.get("/username/:username",async function(){
  const regex = new RegExp(`^${req.params.username}`, "i");
  
  const users = await userModel.find({username:regex})
  res.json(users)
})


router.post("/update", async function (req, res, next) {
  try {
    const taskId = req.body.taskId; // Assuming taskId is sent in the request body

    // Update the task status based on the taskId
    const updatedTask = await taskModel.findByIdAndUpdate(
      taskId,
      { status: req.body.newStatus }, // Assuming newStatus is sent in the request body
      { new: true }
    );

    // Redirect to profile page after updating task status
    res.redirect("/profile");
  } catch (error) {
    // Handle any errors
    console.error("Error updating task status:", error);
    // You might want to send an error response or redirect to an error page
    next(error); // Pass the error to the error handling middleware
  }
});

router.get("/feed", function (req, res, next) {
  res.render("feed");
});

router.post("/register", function (req, res) {
  const userData = new userModel({
    username: req.body.username,
    email: req.body.email,
    fullname: req.body.fullname,
  });

  userModel.register(userData, req.body.password).then(function () {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/profile");
    });
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
  }),
  function (req, res) {}
);

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
    console.log("logged out");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

module.exports = router;
