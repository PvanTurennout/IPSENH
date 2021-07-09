CREATE TABLE IF NOT EXISTS user_genre_meta (
	user INT,
	genre VARCHAR(50),
	amount_played INT,
	PRIMARY KEY (user, genre),
	FOREIGN KEY (user) REFERENCES Users(userId)
);
