CREATE OR REPLACE VIEW PlaylistTrack AS
SELECT P.playlistId, T.trackId, T.artist, T.metadata, T.trackName, S.sourceId, S.type, S.location FROM PlaylistContent P
    JOIN Tracks T on P.trackId = T.trackId
    JOIN Sources S on S.sourceId = T.sourceId
;
