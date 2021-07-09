CREATE TABLE IF NOT EXISTS Tracks(
    trackId INT AUTO_INCREMENT PRIMARY KEY,
    trackName VARCHAR(100) NOT NULL,
    artist VARCHAR(100),
    metadata VARCHAR(100),
    sourceId INT NOT NULL,
    FOREIGN KEY (sourceId) references Sources(sourceId)
);
