const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.user_signup = (req, res, next) => {
  User.find({ phone: req.body.phone })
    .exec()
    .then((user) => {
      //check if a user with req.body.email exists
      if (user.length >= 1) {
        return res.status(422).json({
          message: "Phone Number already exists - use a different Phone Number",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          //check for any errors in hashing the password and creating the user
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              phone: req.body.phone,
              password: hash,
              name: req.body.name,
            });

            //save our user to the db
            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                    message: "User created",
                    data:result
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
};

//login user

exports.user_login = (req, res, next) => {
  User.find({ phone: req.body.phone })
    .exec()
    .then((users) => {
      if (users.length < 1) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }

      bcrypt.compare(req.body.password, users[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }

        if (result) {
          //bcrypt.compare returns true if password and hash match
          const token = jwt.sign(
            {
              phone: users[0].phone,
              userId: users[0]._id,
            },
            "vooshtestapi",
            {
              expiresIn: "1h",
            }
          );

          return res.status(200).json({
            message: "Auth successful",
            token: token,
          });
        }

        //no errors, but auth fails
        res.status(401).json({
          message: "Auth failed",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
