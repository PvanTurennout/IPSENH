CREATE OR REPLACE VIEW UserLibrary AS
SELECT U.userId, P.playlistId, P.playlistName FROM UsersPlaylists U
    JOIN Playlists P ON P.playlistId = U.playlistId
;
