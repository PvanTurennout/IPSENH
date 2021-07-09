CREATE OR REPLACE VIEW PlaylistTrack AS
SELECT P.playlistId, T.trackId, T.artist, T.metadata, T.genre, T.trackName, T.trackAlbum, T.trackYear, S.sourceId, S.type, S.location FROM PlaylistContent P
    JOIN Tracks T on P.trackId = T.trackId
    JOIN Sources S on S.sourceId = T.sourceId;
