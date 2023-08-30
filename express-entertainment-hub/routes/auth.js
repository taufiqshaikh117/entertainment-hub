const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

const firebase = require("../firebaseconfig");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} = require("firebase/auth");

var jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/Fetchuser");

const router = express.Router();
const JWT_TOKEN = "atokenforjwt";

const auth = getAuth(firebase);

router.post(
  "/createuser",
  [
    body("email", "Eneter a Valid EMail").isEmail(),
    body("password", "Name should have atleast 5 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    console.log("API Called");
    // const user = await User.create({
    //   name: req.body.name,
    //   email: req.body.email,
    //   password: req.body.password,
    //   age: req.body.age,
    //   country: req.body.country,
    //   favgenres: req.body.favgenres,
    //   role: req.body.role,
    // });
    createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        user.getIdToken(/* forceRefresh */ true).then(function(idToken) {
          console.log(idToken);
          res.json({success: true,message: "Successfully Signed up",user,idToken});
        }).catch(function(error) {
          console.log(error);
          res.json({success: false,message: error});
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }
);

router.post(
  "/login",
  [
    body("email", "Eneter a Valid Email").isEmail(),
    body("password", "Invalid Password").exists(),
  ],
  async (req, res) => {
    //If there are errors in request return error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const {email,password} = req.body; 
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        user.getIdToken(/* forceRefresh */ true).then(function(idToken) {
          console.log(idToken);
          res.json({success: true,message: "Successfully Logged in",user,idToken});
        }).catch(function(error) {
          console.log(error);
          res.json({success: false,message: error});
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        res.json({success: false,message: errorMessage});
        console.log(errorMessage);
      });
  }
);

// ROUTE 3: For getting user detials
router.get("/getuser", fetchUser, async (req, res) => {
  console.log(req.user);
  res.json(req.user)

  // try {
  //   const userId = req.user.id;
  //   console.log(userId);
  //   const user = await User.findById(userId).select("-password");
  //   res.json({ user });
  // } catch (error) {
  //   console.log(error.message);
  //   res.status(401).send("Internal Server Ocuured.");
  // }
});

module.exports = router;
