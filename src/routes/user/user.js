const {GetAllUser, GetUser, GetMail, GetAllTodo, DeleteUserById, UpdateUserById} = require("./user.query");
const auth = require("../../middleware/auth");

module.exports = function(app, bcryptjs) {
    app.get("/user", auth, (req, res) => {
        GetAllUser(res);
    });
    app.get("/user/todos", auth, (req, res) => {
        GetAllTodo(res, req.user.id);
    });
    app.get("/user/:id", auth, (req, res) => {
        if (!isNaN(req.params.id)) {
            GetUser(res, req.params.id);
        } else {
            GetMail(res, req.params.id);
        }
    });
    app.delete("/user/:id", auth, (req, res) => {
        DeleteUserById(res, req.params.id);
    });
    app.put("/user/:id", auth, async (req, res) => {
        await UpdateUserById(res, req.params.id, req.body.email, bcryptjs.hashSync(req.body.password, 10),
            req.body.name, req.body.firstname);
        GetUser(res, req.params.id);
    });
}