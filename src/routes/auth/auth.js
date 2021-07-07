const {register, CheckIdMail, GetMailId} = require("../user/user.query");

module.exports = function(app, bcryptjs) {
    app.post("/login", (req, res) => {
        if (req.body["email"] === undefined || req.body["password"] === undefined) {
            return res.status(500).json( {"msg": "internal server error"} );
        }
        GetMailId(res, req.body["email"], req.body["password"], bcryptjs, function(number) {
            if (number == 4545) {
                res.json( {"msg": "Invalid Credentials"} )
            }
            return 401;
        });
    });
    app.post("/register", (req, res) => {
        var pass = bcryptjs.hashSync(req.body["password"], 10);
        if (req.body["email"] === undefined || req.body["name"] === undefined || req.body["firstname"] === undefined || pass === undefined) {
            return res.status(500).json( {"msg": "internal server error"} );
        }
        CheckIdMail(res, req.body["email"], function(number) {
            if (number == 4545) {
                return res.status(208).json( {"msg": "account already exists"} )
            } else {
                register(res, req.body["email"], pass, req.body["name"], req.body["firstname"]);
                return res.status(201);
            }
        });
    });
}