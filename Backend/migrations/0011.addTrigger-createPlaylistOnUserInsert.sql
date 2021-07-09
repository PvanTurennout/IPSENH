CREATE TRIGGER CreatePlaylistOnUserInsert BEFORE INSERT ON Users
    FOR EACH ROW
BEGIN
    INSERT INTO Playlists (playlistName) VALUES (CONCAT('e02db835c95d95a83c6f75f785c561f8', NEW.username));
    SET NEW.standardPlaylistId =
            (SELECT playlistId FROM Playlists WHERE playlistName = CONCAT('e02db835c95d95a83c6f75f785c561f8', NEW.username));
END;
