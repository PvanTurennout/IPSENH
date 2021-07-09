CREATE TABLE IF NOT EXISTS UsersPlaylists(
  userId INT NOT NULL,
  playlistId INT NOT NULL,
  PRIMARY KEY (userId, playlistId),
  FOREIGN KEY (userId) REFERENCES Users(userId),
  FOREIGN KEY (playlistId) REFERENCES Playlists(playlistId)
);
