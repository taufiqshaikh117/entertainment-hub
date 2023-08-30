const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const app = require("../firebaseconfig");
const {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
} = require("firebase/firestore");
const fetchUser = require("../middleware/Fetchuser");
const Users = require("../models/User");

const router = express.Router();

const db = getFirestore(app);

router.post(
  "/adduserdetails",
  [
    body("favgenres", "Select atleast 3 Genres ").isLength({ min: 3 }),
    body("favactors", "Select atleast 3 Actor").isLength({ min: 3 }),
    body("favmovies", "Select atleast 6 Movies").isLength({ min: 6 }),
  ],
  fetchUser,
  async (req, res) => {
    const { name, age, country, favgenres, favactors, favmovies, watchlist } =
      req.body.user;
    const newUser = {};
    if (name) {
      newUser.name = name;
    }
    if (req.user.email) {
      newUser.email = req.user.email;
    }
    if (age) {
      newUser.age = age;
    }
    if (country) {
      newUser.country = country;
    }
    if (favgenres) {
      newUser.favgenres = favgenres;
    }
    if (favactors) {
      newUser.favactors = favactors;
    }
    if (favmovies) {
      newUser.favmovies = favmovies;
    }
    if (watchlist) {
      newUser.watchlist = watchlist;
    }
    const user = await Users.create(newUser);
    res.json({ user });
  }
);

router.post("/updateusers", fetchUser, async (req, res) => {
  const { name, age, country, favgenres, favactors, favmovies, watchlist } =
    req.body.user;
  const newUser = {};
  if (name) {
    newUser.name = name;
  }
  if (req.user.email) {
    newUser.email = req.user.email;
  }
  if (age) {
    newUser.age = age;
  }
  if (country) {
    newUser.country = country;
  }
  if (favgenres) {
    newUser.favgenres = favgenres;
  }
  if (favactors) {
    newUser.favactors = favactors;
  }
  if (favmovies) {
    newUser.favmovies = favmovies;
  }
  if (watchlist) {
    newUser.watchlist = watchlist;
  }
  //Find the note to be updated and update it
  let user = await Users.findOne({ email: newUser.email });
  if (!user) {
    return res.status(404).send("User Not Found");
  }
  user = await Users.findOneAndUpdate(
    { email: newUser.email },
    { $set: newUser },
    { new: true }
  );
  res.json({ user });
});

router.get("/getusers", fetchUser, async (req, res) => {
  try {
    //Find the note to be updated and update it
    let user = await Users.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).send("User Not Found");
    }
    res.json({ user });
  } catch (e) {
    console.log(e);
    return res.status(404).send("Failed to fetch User Details");
  }
});

module.exports = router;
