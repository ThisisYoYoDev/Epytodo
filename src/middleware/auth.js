const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const authentication = req.headers.authorization;

    if ( authentication ) {
        const getToken = authentication.split(' ')[1];
        jwt.verify(getToken, process.env.SECRET, (err, user) => {

            if ( err ) {
                console.log(err);
                return res.status(401).json( {"msg": "Token is not valid"} );
            }
            req.user = user;
            next();
        });
    }
    else {
        res.status(401).json( {"msg": "No token, authorization denied"} );
    }
};