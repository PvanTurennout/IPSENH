const database = require("../../config/database");

module.exports = {
    getUsersPlaylists: (userId, response, callBack) => {
        database.query(
            "SELECT playlistId, playlistName FROM UserLibrary WHERE userId = ?",
            [userId],
            (error, result) => {
                if (error) {
                    return callBack(response, error);
                }
                return callBack(response, null, result);
            }
        )
    },

    updatePlaylist: (playlistObject, response, callBack) => {
        database.query(
            "UPDATE Playlists SET playlistName = ? WHERE playlistId = ?",
            [playlistObject.playlistName, playlistObject.playlistId],
            (error, result, ) => {
                if (error) {
                    return callBack(response, error);
                }
                return callBack(response, null, result);
            }
        )
    },

    createPlaylistInDatabase: (playlistName, callBack) => {
        database.query(
            "INSERT INTO Playlists (playlistName) VALUES (?)",
            [playlistName],
            (error, result, ) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result);
            }
        )
    },

    assignPlaylistToUser: (playlistId, userId, callBack) => {
        database.query(
            "INSERT INTO UsersPlaylists (userId, playlistId) VALUES (?, ?)",
            [userId, playlistId],
            (error, result, ) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result);
            }
        )

    }
}
