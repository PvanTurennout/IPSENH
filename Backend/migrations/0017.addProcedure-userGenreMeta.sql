CREATE PROCEDURE add_genre_meta(IN userId INT, IN genre VARCHAR(50))
BEGIN
	INSERT IGNORE INTO user_genre_meta VALUES (userId, genre, 0);

    UPDATE user_genre_meta
    SET amount_played = amount_played + 1
    WHERE user = userId AND genre = genre;
END
