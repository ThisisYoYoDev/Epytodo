const express = require("express");
const body_parser = require("body-parser");
var bcryptjs = require("bcryptjs");
var jwt_token = require("jsonwebtoken");
const app = express();
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());
app.use(body_parser.raw());
const port = 8080;
require("dotenv").config();
require("./routes/user/user")(app, bcryptjs);
require("./routes/todos/todos")(app, bcryptjs);
require("./routes/auth/auth")(app, bcryptjs);

app.use(function(req, res) {
    return res.status(404).json( {"msg": "Not found"} );
});

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})