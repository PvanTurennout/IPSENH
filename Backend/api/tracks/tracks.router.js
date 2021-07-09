const {checkToken} = require("../../auth/token_validation");
const router = require("express").Router();
const {getTracksFromUserPlaylist, changeTrackInfo, getTrackIdsFromPlaylist, deleteTrack, addTrackToPlaylist, uploadTrack} = require("./tracks.controller");
const {logRequest} = require("../../logger/requestLogger");

// uri: /api/track...
router.get('/playlist', logRequest, checkToken, getTracksFromUserPlaylist);

router.post('/playlist/ids', logRequest, checkToken, getTrackIdsFromPlaylist)
router.post('/',logRequest, checkToken, uploadTrack);
router.post("/playlist/add", logRequest, checkToken, addTrackToPlaylist);

router.put('/', logRequest, checkToken, changeTrackInfo);

router.delete("/delete/:trackId", logRequest, checkToken, deleteTrack);

module.exports = router;
