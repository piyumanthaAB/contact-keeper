const express = require('express');
const router = express.Router();
const User = require('./../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { check, validationResult } = require('express-validator');





// create user
router.post('/',
  check('name', 'Please add name').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 2 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;


    try {

      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        }
      };
          
        
      jwt.sign(
        payload,
        'JWT_SECRET',
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;

          const cookieOptions = {
            expires: new Date(Date.now() + 5000000),
            httpOnly: true
          };
          
          if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

          res.cookie('jwt', token, cookieOptions);

          res.json({ token });
        }
      );

      
          

            
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }

  });


module.exports = router;





