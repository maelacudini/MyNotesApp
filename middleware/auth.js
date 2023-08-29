const jsonwebtoken = require('jsonwebtoken');
const config = require('config');

//middleware function, next is a callback that we use to move on to the next task
module.exports = function (req, res, next) {
    //get token from header of request
    const token = req.header('x-auth-token')

    //check if no token (and the route is protected, so we are using this middleware)
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' })
    }

    //token exists, verify token (by decoding it)
    try {
        const decoded = jsonwebtoken.verify(token, config.get('jwtSecret'))
        req.user = decoded.user
        next()
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' })
    }
}

//we'll need this inside auth.js route 