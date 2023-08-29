const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const jsonwebtoken = require('jsonwebtoken')
const bcryptjs = require('bcryptjs');
const config = require('config');
const auth = require('../../middleware/auth')
const User = require('../../models/User')


// @route    GET api/auth
// @desc     get user infos in response using the token
// @access   private (so protected, since we are using auth middleware)
router.get('/', auth, async (req, res) => {
    try {
        //since it's a protected route and we are using the token that contains the user id, we can access the user id by calling user
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server error')
    }
})


// @route    POST api/auth
// @desc     Log in by using mail and password and get token in response
// @access   public
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    //destructure req.body
    const { email, password } = req.body;

    try {
        //check if user does not exists, invalid credentials
        let user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] })
        }

        //compare passwords, the one inserted and the one in the database
        const isMatch = await bcryptjs.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] })
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jsonwebtoken.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 3600000 },
            (error, token) => {
                if (error) {
                    throw error;
                } else {
                    res.json({ token })
                }
            })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error')
    }
})

module.exports = router;