const database = require("../../config/database");
const logger = require("../../logger/logger");


module.exports = {
    getTracksByPlaylistId: (playlistId, response, callBack) => {
        database.query(
            "SELECT trackId, artist, trackName, type, trackAlbum as album, trackYear as year, genre, location FROM PlaylistTrack WHERE playlistId = ?",
            [playlistId],
            (error, result, ) => {
                if (error) {
                    return callBack(response, error);
                }
                return callBack(response, null, result);
            }
        )
    },

    getTrackIdsForPlaylist: (playlistId, callBack) => {
        database.query(
            "SELECT trackId FROM PlaylistContent WHERE playlistId = ?",
            [playlistId],
            (error, result) => {
                if (error) {
                    logger.error(error);
                    callBack(null, error);
                }

                callBack(result);
            }
        )
    },

    updateTrack: (trackObject, response, callBack) => {
        database.query(
            "UPDATE Tracks SET trackName = ?, artist = ?, trackAlbum = ?, trackYear = ?, genre = ? WHERE trackId = ?",
            [trackObject.trackName, trackObject.artist, trackObject.album, trackObject.year, trackObject.genre, trackObject.trackId],
            (error, result, ) => {
                if (error) {
                    logger.error(error);
                    return callBack(response, error);
                }
                return callBack(response, null, result);
            }
        )
    },

    uploadTrackToDatabase: (type, location, callBack) => {
        database.query(
            "INSERT INTO Sources (type, location) VALUES(?, ?);",
            [type, location],
            (error, results) => {
                if (error) {
                    logger.error(error);
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    uploadTrackMetaData: (data, callBack) => {
        database.query(
            "INSERT INTO Tracks (trackName, artist, sourceId, genre, trackYear, trackAlbum) VALUES(?, ?, ?, ?, ?, ?);",
            [data.trackName, data.artist, data.sourceId, data.genre, data.year, data.album],
            (error, results) => {
                if (error) {
                    logger.error(error);
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    deleteTrackFromDatabase: (id, callBack) => {
        database.query(
            "DELETE FROM PlaylistContent WHERE trackId = ?;",
            [id],
            (error, results) => {
                if (error) {
                    logger.error(error);
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    addTrackToPlaylistInDatabase: (playListId, trackId, callBack) => {
        database.query(
            "INSERT INTO PlaylistContent (playlistId, trackId) VALUES (?, ?);",
            [playListId, trackId],
            (error, results) => {
                if (error) {
                    logger.error(error);
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
}
