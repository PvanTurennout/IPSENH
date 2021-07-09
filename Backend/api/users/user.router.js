const {createUser, login, getUserById, getUsers, updateUser, deleteUser,
       getUserGenreStats, updateUserGenreStat, getUserTrackStats,  updateUserTrackStat} = require("./user.controller");
const router = require("express").Router();
const {checkToken} = require("../../auth/token_validation");
const {logRequest} = require("../../logger/requestLogger");

// uri: /api/users...
// Do not check for a token at login or register.
router.post("/register", logRequest, createUser);
router.post("/login", logRequest, login);

router.get("/", logRequest, checkToken, getUsers);
router.get("/:id", logRequest, checkToken, getUserById);
router.get("/stats/track/:id", logRequest, checkToken, getUserTrackStats);
router.get("/stats/genre/:id", logRequest, checkToken, getUserGenreStats);

router.put("/stats/track/", logRequest, checkToken, updateUserTrackStat);
router.put("/stats/genre/", logRequest, checkToken, updateUserGenreStat);
router.patch("/", logRequest, checkToken, updateUser);

router.delete("/", logRequest, checkToken, deleteUser);

module.exports = router;
