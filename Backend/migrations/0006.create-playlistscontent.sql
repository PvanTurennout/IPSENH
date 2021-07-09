CREATE TABLE IF NOT EXISTS PlaylistContent(
  playlistId INT NOT NULL,
  trackId INT NOT NULL,
  PRIMARY KEY (playlistId, trackId),
  FOREIGN KEY (playlistId) REFERENCES Playlists(playlistId),
  FOREIGN KEY (trackId) REFERENCES Tracks(trackId)
);
