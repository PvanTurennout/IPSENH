const router = require("express").Router();
const {checkToken} = require("../../auth/token_validation");
const {logRequest} = require("../../logger/requestLogger");
const { getUserLibrary, editPlaylist, createPlaylist } = require("./playlist.controller");

// uri: /api/playlist...
router.get("/user", logRequest, checkToken, getUserLibrary);
router.put("/", logRequest, checkToken, editPlaylist);

router.post("/", logRequest, checkToken, createPlaylist);


module.exports = router;
