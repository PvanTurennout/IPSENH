const {
    standardGetServiceCallBackFunction,
    standardPutServiceCallBackFunction
} = require("../playlists/servicesHandeler.functions");
const {
    getTracksByPlaylistId,
    updateTrack,
    getTrackIdsForPlaylist,
    uploadTrackToDatabase,
    uploadTrackMetaData,
    deleteTrackFromDatabase,
    createPlaylist,
    addTrackToPlaylistInDatabase
} = require("./tracks.service");
const {decode} = require("jsonwebtoken");
const logger = require("../../logger/logger");

module.exports = {
    getTracksFromUserPlaylist: (request, response) => {
        const jwt = request.get('authorization').split(" ")[1];
        const playlistId = decode(jwt).result.standardPlaylistId;
        getTracksByPlaylistId(playlistId, response, standardGetServiceCallBackFunction)
    },

    getTrackIdsFromPlaylist: (request, response) => {
        const playlistIds = extractBody(request);

        const idSets = {};
        for (const playlist of playlistIds) {
            let trackIds = [];
            getTrackIdsForPlaylist(playlist, (result, error) => {
                if (error) {
                    logger.error(error);
                    return response.status(500).json({message: "Internal Server Error"});
                }

                if (!result) {
                    trackIds = [];
                }
                result.forEach(
                    row => {
                        trackIds.push(row.trackId);
                    }
                );
                idSets[playlist] = trackIds;

                if (playlistIds[playlistIds.length - 1] === playlist) {
                    response.status(200).json({data: idSets});
                }
            });
        }
    },

    changeTrackInfo: (request, response) => {
        updateTrack(extractBody(request), response, standardPutServiceCallBackFunction);
    },

    deleteTrack: (request, response) => {
        let trackId = request.params.trackId;

        deleteTrackFromDatabase(trackId, (err, response1) => {
            if (err) {
                return response.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }

            return response.status(200).json({
                success: 1
            });
        })
    },

    uploadTrack: (request, responseToFrontend) => {
        let body = extractBody(request);

        let trackName = body.trackName;
        let artist = body.artist;
        let sourceType = body.sourceType;
        let album = body.album;
        let year = body.year;
        let genre = body.genre;
        let sourceUrl = body.sourceUrl;
        let defaultPlaylistId = body.defaultPlaylist;
        let sourceId;
        let trackId;

        let data = {trackName, artist, sourceType, album, year, genre, sourceUrl};


        uploadTrackToDatabase(sourceType, sourceUrl, (error, responseFromDatabase) => {
            if (error) {
                return responseToFrontend.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }

            sourceId = responseFromDatabase.insertId;
            data.sourceId =sourceId;

            uploadTrackMetaData(data, (error, responseFromDatabase2) => {
                if (error) {
                    return responseToFrontend.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    });
                }

                trackId = responseFromDatabase2.insertId;
                data.trackId = trackId;

                addTrackToPlaylistInDatabase(defaultPlaylistId, trackId, (error, responseFromDatabase3) => {
                    if (error) {
                        return responseToFrontend.status(500).json({
                            success: 0,
                            message: "Database connection error"
                        });
                    }
                    return responseToFrontend.status(200).json({
                        success: 1,
                        data: {
                            trackId: trackId,
                            defaultPlaylistId: defaultPlaylistId
                        }
                    });

                });
            });
        });
    },

    addTrackToPlaylist: (request, response) => {
        let body = extractBody(request);
        let playlistId = body.playlistId;
        let trackId = body.trackId;

        addTrackToPlaylistInDatabase(playlistId, trackId, (err, response1) => {
            if (err && err.sqlState == 23000) {
                return response.status(400).json({
                    success: 0,
                    message: "The provided track is already in the target playlist"
                });
            } else if (err){
                return response.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }

            return response.status(200).json({
                success: 1
            });
        })
    }
}


function extractBody(request) {
    return request.body;
}
