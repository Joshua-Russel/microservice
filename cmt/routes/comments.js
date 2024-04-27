const express = require("express");
const router = express.Router();

router.get("/home", (req, res) => {
	res.send("home page");
});
router.get("/create", (req, res) => {
	res.send("create page");
});
router.get("/delete", (req, res) => {
	res.send("delete page");
});
module.exports = router;
