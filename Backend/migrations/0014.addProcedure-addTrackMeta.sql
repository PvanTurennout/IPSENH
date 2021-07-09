CREATE PROCEDURE add_track_meta(IN userId INT, IN trackId INT)
BEGIN
	INSERT IGNORE INTO user_track_meta VALUES (userId, trackId, 0);

    UPDATE user_track_meta
    SET amount_played = amount_played + 1
    WHERE user = userId AND track = trackId;
END
