export class Track {
  private readonly _trackId: number;
  private _trackName: string;
  private _artist: string;
  private _sourceType: string;
  private _album: string;
  private _year: number;
  private _genre: string;
  private _sourceUri: string;

  constructor(trackId: number, trackName: string, artist: string, sourceType: string, sourceUri: string, genre?: string, album?: string, year?: number) {
    this._trackId = trackId;
    this._trackName = trackName;
    this._artist = artist;
    this._sourceType = sourceType;
    this._album = album;
    this._year = year;
    this._genre = genre;
    this._sourceUri = sourceUri;
  }

  static trackFromDTO(dto: TrackDTO) {
    return new Track(dto.trackId, dto.trackName, dto.artist, dto.type, dto.location, dto.genre, dto.album, dto.year);
  }

  public toTrackDTO(): TrackDTO  {
    return {
      trackId: this._trackId,
      trackName: this._trackName,
      artist: this._artist,
      type: this._sourceType,
      location: this._sourceUri,
      album: this._album,
      year: this._year,
      genre: this._genre
    };
  }


  get trackId(): number {
    return this._trackId;
  }

  get trackName(): string {
    return this._trackName;
  }

  get artist(): string {
    return this._artist;
  }

  get sourceType(): string {
    return this._sourceType;
  }

  get album(): string {
    return this._album;
  }

  get year(): number {
    return this._year;
  }

  get genre(): string {
    return this._genre;
  }

  get sourceUri(): string {
    return this._sourceUri;
  }
}

export interface TrackDTO {
  trackId: number;
  trackName: string;
  artist: string;
  type?: string;
  album?: string;
  year?: number;
  genre?: string;
  location?: string;
}
