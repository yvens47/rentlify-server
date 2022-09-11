const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const userModel = require('../models/userModel')



// login user in
const login = Model => async (req, res) => {

  const { email, password } = req.body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // no empty email and password
  try {
    // find user by email
    const user = await Model.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Email does not exist" });
    }
    // compare password against db->password    
    if (! await bcrypt.compare(password, user.password)) {
      return res.status(400).json({ success: false, message: "Email and/or password is incorrect" });
    }
    // create token    
    const token = jwt.sign({ userid: user._id }, process.env.JWT || "secret", { expiresIn: '7d' });
    const expiryDate = new Date(Date.now() + 60 * 60 * 24 * 1000) // 24 hour
    res.cookie('my_token', token,
      {
        expires: expiryDate,
        httpOnly: true,
        secure: true,
      });
    user.password = null;
    res.json({ success: true, token, message: "Yo have logged in successfully", user });
  }
  catch (e) {

    console.log(e);
    res.status(400).json({ message: "Could not log you in at this time" });

  }



}
const register = Model => async (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }

  try {


    const user = new Model(req.body);

    // 1. save company name to company collection if not already in.

    // user.customer_id = CustomerId;
    user.save(function(err) {
      if (err)
        res.status(400).json({ success: false, error: err.message });
      res.json({ success: true, message: "You have registered successfully" })

    });
  }
  catch (e) {
    console.log(e)
    res.status(400).json({ success: false, message: "Unable to register you at this time" })
  }



}

const signout = (req, res) => {

  res.json({ message: "signed out Successfully" })
}



module.exports = {
  login: login(userModel),
  register: register(userModel),
  signout: signout    
}