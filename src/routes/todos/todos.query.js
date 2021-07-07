var db = require("../../config/db");
const jwt = require('jsonwebtoken');

exports.AllTodo = function(res) {
    db.query("SELECT * FROM `todo`", function(_err, result) {
        res.status(200).json(result);
    });
}

exports.TodoId = function(res, id) {
    db.query("SELECT * FROM `todo` WHERE id = ?", [id], function(_err, result) {
        if (result[0] === undefined) {
            return res.status(404).json( {"msg": "Not found"} );
        }
        res.status(200).json(result[0]);
    });
}

exports.CreateTodo = function(res, title, description, duetime, status, id) {
    db.execute("INSERT INTO `todo` (title, description, due_time, status, user_id) VALUES (?, ?, ?, ?, ?)",
    [title, description, duetime, status, id], function(_err, result) {
        if ( _err ) {
            res.status(501).json( {"msg": "internal server error"} );
            return console.error(_err);
        }
        res.status(200).json( {
            "id": result.insertId,
            "title": title,
            "description": description,
            "created_at": new Date(),
            "due_time": duetime,
            "user_id": id,
            "status": status
        })
    });
}

exports.DeleteTaskById = function(res, id) {
    db.execute("DELETE FROM `todo` WHERE id = ?", [id], function(_err, result) {
        res.status(200).json( {"msg": `succesfully deleted record number: ${id}`} );
    });
}

exports.UpdateTaskById = function(res, id, title, description, duetime, user_id, status) {
    db.execute("UPDATE `todo` SET title = ?, description = ?, due_time = ?, user_id = ?, status = ? WHERE id = ?",
    [title, description, duetime, user_id, status, id], function(_err, result) {
        res.status(200).json(
            {
                "title": title,
                "description": description,
                "due_time": duetime,
                "user_id": user_id,
                "status": status
            } );
    });
}
