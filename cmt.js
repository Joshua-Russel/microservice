const express = require("express");
const app = express();
const path = require("path");
const meth = require("method-override");
const { v4: uid } = require("uuid");
app.listen(3000, () => {
	console.log("server running on port 3000 ");
});
let comments = [
	{ id: uid(), user: "jack1234", comment: "today's a good day i guess" },
	{ id: uid(), user: "jordan35", comment: "the day everyone feared has come" },
	{
		id: uid(),
		user: "pirateluffy",
		comment: "i'm the man who is gonna be the king of pirates",
	},
	{ id: uid(), user: "ronaldo", comment: "today is gonna be a rough day" },
];
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(meth("_method"));
app.get("/comments", (req, res) => {
	res.render("allcmt", { comments });
});
app.get("/comments/new", (req, res) => {
	res.render("newform");
});
app.post("/comments", (req, res) => {
	const { user, comment } = req.body;
	comments.push({ user, comment, id: uid() });

	setTimeout(() => {
		res.redirect("/comments");
	}, 4000);
});
app.get("/comments/:id", (req, res) => {
	const { id } = req.params;
	const comment = comments.find((cmt) => cmt.id === id);
	res.render("show", { comment });
});
app.get("/comments/:id/edit", (req, res) => {
	const { id } = req.params;
	const comment = comments.find((cmt) => cmt.id === id);
	res.render("update", { comment });
});
app.patch("/comments/:id", (req, res) => {
	const { id } = req.params;
	const { update: newcmt } = req.body;
	const comment = comments.find((cid) => cid.id === id);
	comment.comment = newcmt;
	res.redirect("/comments");
});
app.delete("/comments/:id", (req, res) => {
	const { id } = req.params;
	comments = comments.filter((cmt) => cmt.id !== id);
	res.redirect("/comments");
});
