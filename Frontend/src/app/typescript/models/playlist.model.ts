export class Playlist{
  private _playlistId: number;
  private _name: string;
  private _trackIds: number[];

  constructor(playlistId: number, name: string) {
    this._playlistId = playlistId;
    this._name = name;
    this._trackIds = [];
  }

  public static playlistFromDTO(dto: PlaylistDTO): Playlist {
    return new Playlist(dto.playlistId, dto.playlistName);
  }

  public toPlaylistDTO(): PlaylistDTO {
    return {
      playlistId: this._playlistId,
      playlistName: this._name
    };
  }


  get playlistId(): number {
    return this._playlistId;
  }

  set playlistId(value: number) {
    this._playlistId = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get tracks() {
    return this._trackIds;
  }

  set tracks(value: number[]) {
    this._trackIds = value;
  }

  addTrack(trackId: number){
    this._trackIds.push(trackId);
  }

  removeTrack(trackId: number) {
    const index = this._trackIds.indexOf(trackId);
    if (index !== -1) {
      this._trackIds.splice(index, 1);
    }
  }
}

export interface PlaylistDTO{
  playlistId: number;
  playlistName: string;
}
