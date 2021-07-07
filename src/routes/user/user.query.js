var db = require("../../config/db");
const jwt = require("jsonwebtoken")

exports.GetAllUser = function(res) {
    db.query("SELECT * FROM `user`", function(_err, result) {
        res.status(200).json(result);
    });
};

exports.GetUser = function(res, id) {
    db.query("SELECT * FROM `user` WHERE id = ?", [id], function(_err, result) {
        if (result[0] === undefined) {
            return res.status(404).json( {"msg": "User not found"} );
        }
        res.status(200).json(result[0]);
    });
};

exports.GetMail = function(res, email) {
    db.query("SELECT * FROM `user` WHERE email = ?", [email], function(_err, result) {
        if (result[0] === undefined) {
            return res.status(404).json( {"msg": "User not found"} );
        }
        res.status(200).json(result[0]);
    });
};

exports.GetAllTodo = function(res, id) {
    db.query("SELECT * FROM `todo` WHERE user_id = ?", [id], function(_err, result) {
        res.status(200).json(result);
    });
};

exports.register = function(res, mail, password, name, firstname) {
    db.execute("INSERT INTO `user` (email, password, name, firstname) VALUES (?, ?, ?, ?)",
    [mail, password, name, firstname], function(_err, result) {
        const token = jwt.sign( {email:mail, password:password}, process.env.SECRET);
        res.json( {token} );
    });
};

exports.CheckIdName = function(res, name, callback) {
    db.execute("SELECT * FROM `user` WHERE name = ?", [name], function(_err, result) {
        if ( result.length > 0) {
            callback(4545);
        } else {
            callback(0)
        }
    });
};

exports.CheckIdMail = function(res, mail, callback) {
    db.execute("SELECT * FROM `user` WHERE email = ?", [mail], function(_err, result) {
        if ( result.length > 0) {
            callback(4545);
        } else {
            callback(0)
        }
    });
};

exports.GetMailId = function(res, mail, password, bcrypt, callback) {
    db.execute("SELECT password, id FROM `user` WHERE email = ?", [mail], function(_err, result) {
        if ( result.length > 0) {
            var pass = result[0].password;
            var ids = result[0].id;
            if ( bcrypt.compareSync(password, pass) ) {
                const token = jwt.sign( {email: mail, id: ids}, process.env.SECRET );
                res.json({token});
                callback(0);
            } else {
                callback(4545);
            }
        } else {
            callback(4545);
        }
    });
};

exports.DeleteUserById = function(res, id) {
    db.execute("DELETE FROM `user` WHERE id = ?", [id], function(_err, result) {
        res.status(202).json( {"msg": `succesfully deleted record number: ${id}`} );
    });
};

exports.UpdateUserById = async function(res, id, mail, password, name, firstname) {
    await db.execute("UPDATE `user` SET email = ?, password = ?, name = ?, firstname = ? WHERE id = ?",
        [mail, password, name, firstname, id]);
    res.status(200);
};