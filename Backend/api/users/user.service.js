const pool = require("../../config/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO Users(username, password)
             VALUES(?, ?)`,
            [
                data.username,
                data.password
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getUsers: callBack => {
        pool.query(
            `SELECT userId, username, listenHistory
             FROM Users`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }

        )
    },

    getUserById: (id, callBack) => {
        pool.query(
            `SELECT userId, username, state, listenHistory 
             FROM Users 
             WHERE userId = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },

    getUserByUsername: (username, callBack) => {
        pool.query(
            `SELECT userId, username, password, state, listenHistory, standardPlaylistId 
             FROM Users 
             WHERE username = ?`,
            [username],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },

    selectUserTrackStats: (id, callBack) => {
        pool.query(
            `SELECT trackName, amount_played
                 FROM user_track_meta 
                 INNER JOIN Users ON user_track_meta.user = Users.userId
                 INNER JOIN Tracks ON user_track_meta.track = Tracks.trackId
                 WHERE user = ?
                 ORDER BY amount_played DESC
                 LIMIT 10;`,
            [id],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    selectUserGenreStats: (id, callBack) => {
        pool.query(
            `SELECT genre, amount_played
                 FROM user_genre_meta 
                 WHERE user = ?
                 ORDER BY amount_played DESC
                 LIMIT 10;`,
            [id],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    updateUserTrackStat: (data, callBack) => {
        pool.query(
            `CALL add_track_meta(?, ?);`,
            [data.userId, data.trackId],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                if (!results) {
                    return res.json({
                        success: 0,
                        message: "Failed to update statistics"
                    });
                }
                return callBack(null, results);
            }
        )
    },

    updateUserGenreStat: (data, callBack) => {
        pool.query(
            `CALL add_genre_meta(?, ?);`,
            [data.userId, data.genre],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                if (!results) {
                    return res.json({
                        success: 0,
                        message: "Failed to update statistics"
                    });
                }
                return callBack(null, results);
            }
        )
    },

    updateUser: (data, callBack) => {
        pool.query(
            `UPDATE Users
             SET username = ?, password = ?, state = ?, listenHistory = ?
             WHERE userId = ?`,
            [
                data.username,
                data.password,
                data.state,
                data.listenHistory,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                if (!results) {
                    return res.json({
                        success: 0,
                        message: "Failed to update user"
                    });
                }
                return callBack(null, results);
            }
        )
    },

    deleteUser: (data, callBack) => {
        pool.query(
            `DELETE FROM Users
             WHERE userId = ?`,
            [data.id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    }
}
