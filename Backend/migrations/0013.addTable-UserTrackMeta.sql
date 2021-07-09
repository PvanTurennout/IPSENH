CREATE TABLE IF NOT EXISTS user_track_meta (
	user INT,
	track INT,
	amount_played INT,
	PRIMARY KEY (user, track),
	FOREIGN KEY (user) REFERENCES Users(userId),
	FOREIGN KEY (track) REFERENCES Tracks(trackId)
);
