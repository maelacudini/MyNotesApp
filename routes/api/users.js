const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const config = require('config')
const emails = require('@emailjs/nodejs');
const auth = require('../../middleware/auth');
const Note = require('../../models/Note');
const User = require('../../models/User');
require('dotenv').config();



// @route    POST api/users
// @desc     Register user
// @access   public
router.post('/', [
    check('name', 'Name is required').trim().notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').trim().isLength({ min: 6 }),
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    //destructure req.body
    const { name, email, password } = req.body;

    try {
        //check if user exists
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists!' }] })
        }

        //create an instance of User, this does not save the user
        user = new User({
            name,
            email,
            password
        })

        //encrypt user's password
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        //save user to database
        await user.save()

        //return jsonwebtoken (why should you use jwt? --> https://auth0.com/docs/secure/tokens/json-web-tokens)
        //we'll need this token to authenticate the user (log in, access private routes, ...)
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


// @route    DELETE api/user
// @desc     Delete user & notes
// @access   Private
router.delete('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)

        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'User does not exist!' }] });
        }

        await Note.deleteMany({ user: user._id });

        await user.deleteOne();

        res.json({ msg: 'User and notes deleted' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error')
    }
})



// @route    PUT api/user/edit/:user_id
// @desc     Edit user
// @access   Private
router.put('/edit/:user_id', auth, async (req, res) => {

    // Destructure request
    const { name, currentPassword, newPassword, } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
        return res.status(400).json({ errors: [{ msg: 'User does not exist!' }] });
    }

    try {
        if (name) {
            user.name = name;
        } else if (!name) {
            user.name = user.name;
        }

        // Check if newPassword is provided and not empty
        if (currentPassword && newPassword) {

            // Get encrypted password
            const encryptedPassword = user.password;

            // Compare inserted current password with old password, you can't change password if you dont insert the current password
            const isPasswordMatch = await bcrypt.compare(currentPassword, encryptedPassword);
            if (!isPasswordMatch) {
                return res.status(400).json({ errors: [{ msg: 'Invalid current password' }] });
            }

            // Encrypt new password
            const salt = await bcrypt.genSalt(10);
            const newEncryptedPassword = await bcrypt.hash(newPassword, salt);

            // Update user's password
            user.password = newEncryptedPassword;

            //send email after password has been changed
            try {
                const emailParams = {
                    from_name: 'NotesApp',
                    to_name: user.email,
                    message: 'Your password has been changed!',
                };

                const options = {
                    publicKey: process.env.PUBLIC_KEY,
                    privateKey: process.env.PRIVATE_KEY,
                };

                emails
                    .send(process.env.SERVICE_ID, process.env.TEMPLATE_ID, emailParams, options)
                    .then((response) => {
                        console.log('Email sent successfully!', response);
                    })
                    .catch((err) => {
                        console.error('Error sending email:', err);
                        res.status(500).json({ success: false, message: 'Failed to send email' });
                    });

            } catch (error) {
                console.error(error.message);
                res.status(500).send('Error sending email');
            }
        }

        // Save the updated user
        await user.save();

        res.status(200).json({ success: true, message: 'User updated successfully' });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});


module.exports = router;