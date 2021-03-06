const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

router.get("/getUsers", (req, res) => {
  User.find({}).exec((err, users) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(users);
  });
});

router.get("/getUser/:username", (req, res) => {
  User.findOne({ username: req.params.username }).exec((err, users) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(users);
  });
});

router.post("/update", (req, res) => {
  const result = User.findOneAndUpdate(
    { username: req.body.username },
    { elo: req.body.elo },
    { new: true }
  ).exec((err, user) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(user);
  });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username,
    });
  }
);

router.post("/register", (req, res) => {
  // Check to make sure nobody has already registered with a duplicate username
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ username: req.body.username }).then((user) => {
    if (user) {
      // Use the validations to send the error
      errors.username = "Username already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        // elo: 1200,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              const payload = { id: user.id, username: user.username };

              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token,
                  });
                }
              );
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username }).then((user) => {
    if (!user) {
      // Use the validations to send the error
      errors.username = "User not found";
      return res.status(404).json(errors);
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = { id: user.id, username: user.username, elo: user.elo };

        jwt.sign(
          payload,
          keys.secretOrKey,
          // Tell the key to expire in one hour
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res.status(400).json({ password: "Incorrect password" });
      }
    });
  });
});

router.delete("/deleteUser/:username", (req, res) => {
  debugger;
  User.findOneAndDelete({ username: req.params.username }).exec((err, user) => {
    debugger;
    if (err) return res.status(500).send(err);
    res.redirect("/");
  });
});

module.exports = router;
