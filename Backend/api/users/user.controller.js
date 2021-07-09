const { create, getUsers, getUserById, getUserByUsername, updateUser,
        deleteUser, selectUserGenreStats, updateUserGenreStat, selectUserTrackStats,
        updateUserTrackStat } = require("./user.service");

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const logger = require("../../logger/logger");



module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt =  genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if (err) {
                logger.error(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getUserById: (req, res) => {
        const id = req.params.id;
        getUserById(id, (err, results) => {
            if (err) {
                logger.error(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    login: (req, res) => {
        const body = req.body;
        getUserByUsername(body.username, (err, results) => {
            if (err) {
                logger.error(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            if (!results) {
                return res.status(403).json({
                    success: 0,
                    message: "Invalid username or password"
                });
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined; // Avoid unnecessary trafficking of passwords
                const jsontoken = sign(
                    { result: results },
                    process.env.SECRET,
                    { expiresIn: "10h" }
                );
                return res.status(200).json({
                    success: 1,
                    message: "Login successful",
                    token: jsontoken
                })
            }
            else {
                return res.status(403).json({
                    success: 0,
                    message: "Invalid username or password"
                });
            }
        });
    },

    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                logger.error(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getUserTrackStats: (req, res) => {
        const id = req.params.id;
        selectUserTrackStats(id, (err, results) => {
            if (err) {
                logger.error(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: "User not found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },

    getUserGenreStats: (req, res) => {
        const id = req.params.id;
        selectUserGenreStats(id, (err, results) => {
            if (err) {
                logger.error(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: "User not found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },

    updateUserTrackStat: (req, res) => {
        const body = req.body;
        updateUserTrackStat(body, (err, results) => {
            if (err) {
                logger.error(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "statistic updated successfully"
            });
        })
    },

    updateUserGenreStat: (req, res) => {
        const body = req.body;
        updateUserGenreStat(body, (err, results) => {
            if (err) {
                logger.error(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });;
            }
            return res.status(200).json({
                success: 1,
                message: "statistic updated successfully"
            });
        })
    },

    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        updateUser(body, (err, results) => {
            if (err) {
                logger.error(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });;
            }
            return res.status(200).json({
                success: 1,
                message: "User updated successfully"
            });
        });
    },

    deleteUser: (req, res) => {
        const data = req.body;

        deleteUser(data, (err, results) => {
            if (err) {
                logger.error(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });;
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "User deleted successfully"
            });
        });
    }
}
