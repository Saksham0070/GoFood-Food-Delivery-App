const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../models/User");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtSecret = "TheToughScretKeyForAuthorization";

router.post("/loginuser",[
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],async (req, res) => {

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ result: result.array() });
    }

    let email = req.body.email;
      try {
        let userData = await User.findOne({email});
        if(!userData){
            return res.status(400).json({errors:"Try logging with correct credentials"})
        }
        const pwdComapare = await bcrypt.compare(req.body.password,userData.password);

        if(!pwdComapare){
            return res.status(400).json({errors:"Try logging with correct credentials"});
        }else{
            const data = {
                user:{
                    id:userData.id
                }
            }
            const authToken = jwt.sign(data,jwtSecret);

            console.log("User Checked In");
            res.json({ success: true ,authToken:authToken});
        }
        
      } catch (err) {
        console.log(err);
      }
    }
  );
router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password").isLength({ min: 5 }),
  ],

  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ result: result.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password,salt);

    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      });
      console.log("New User Data Added")
      res.json({ success: true });
    } catch (err) {
      console.log(err);
    }
  }
);

module.exports = router;
