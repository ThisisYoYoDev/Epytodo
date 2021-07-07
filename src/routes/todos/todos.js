const {AllTodo, TodoId, CreateTodo, DeleteTaskById, UpdateTaskById} = require("./todos.query");
const auth = require("../../middleware/auth");
const id_auth = require("../../middleware/notFound");

module.exports = function(app, bcryptjs) {
    app.get("/todo", auth, (req, res) => {
        AllTodo(res);
    });
    app.get("/todo/:id", auth, (req, res) => {
        TodoId(res, req.params.id);
    });
    app.post("/todo", auth, (req, res) => {
        CreateTodo(res, req.body["title"], req.body["description"], req.body["due_time"], req.body["status"], req.body["user_id"]);
    });
    app.delete("/todo/:id", auth, (req, res) => {
        DeleteTaskById(res, req.params.id);
    });
    app.put("/todo/:id", auth, (req, res) => {
        UpdateTaskById(res, req.params.id, req.body["title"], req.body["description"], req.body["due_time"], req.body["user_id"], req.body["status"]);
    });
}