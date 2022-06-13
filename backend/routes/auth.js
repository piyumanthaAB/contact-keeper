const express = require('express');
const User = require('./../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { check, validationResult } = require('express-validator');

const auth = require('./../middleware/auth');

const router = express.Router();

// get logged in user
router.get('/',auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }

})

//auth user & get token
router.post('/',
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        

        try {
            let user = await User.findOne({ email });


            if (!user) {
                return res.status(400).json({ msg: 'Invalid Credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid Credentials' });
            }

            const payload = {
                user: {
                    id: user.id
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
            
                    console.log({'created token':token});
                    
                      res.cookie('jwt', token, cookieOptions);
                    
                    res.json({ token });

                }
            );
        } catch (error) {
            
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    });

router.get('/logout', async(req, res) => {
    res.cookie('jwt', '', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({ status: 'success' });
})

module.exports = router;





