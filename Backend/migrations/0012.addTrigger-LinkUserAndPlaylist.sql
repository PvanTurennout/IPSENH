CREATE TRIGGER LinkUserAndPlaylist AFTER INSERT ON Users
    FOR EACH ROW
    INSERT INTO UsersPlaylists VALUES (
        NEW.userId,
        (SELECT playlistId FROM Playlists WHERE playlistName = CONCAT('e02db835c95d95a83c6f75f785c561f8', NEW.username))
    )
;
