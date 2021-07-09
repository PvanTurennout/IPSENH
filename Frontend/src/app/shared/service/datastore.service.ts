import {Injectable} from "@angular/core";
import {Playlist} from "../../typescript/models/playlist.model";
import {Track} from "../../typescript/models/track.model";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: "root"})
export class Datastore {
  private _playlists: Playlist[];
  private _tracks: Track[];

  private _playlistsSubject: BehaviorSubject<Playlist[]> = new BehaviorSubject<Playlist[]>([]);
  private _tracksSubject: BehaviorSubject<Track[]> = new BehaviorSubject<Track[]>([]);

  constructor() {
  }

  set playlists(list: Playlist[]){
    this._playlists = list;
    this.emitPlaylists();
  }

  set tracks(list: Track[]) {
    this._tracks = list;
    this.emitTracks();
  }

  get tracksSubject() {
    return this._tracksSubject;
  }

  get playlistsObservable() {
    return this._playlistsSubject.asObservable();
  }

  addTrack(track: Track) {
    this._tracks.push(track);
    this.emitTracks();
  }

  removeTrack(track: Track){
    this._tracks.splice(this._tracks.indexOf(track), 1);
    this.emitTracks();
  }

  updateTrack(track: Track) {
    const index = this.findTrackById(track.trackId);
    this._tracks[index] = track;
    this.emitTracks();
  }

  addPlaylist(playlist: Playlist) {
    this._playlists.push(playlist);
    this.emitPlaylists();
  }

  updatePlaylist(playlist: Playlist) {
    const index = this.findPlaylistById(playlist.playlistId);
    this._playlists[index] = playlist;
    this.emitPlaylists();
  }

  public addToPlaylist(playlistId: number, trackId: number) {
    const index = this.findPlaylistById(playlistId);
    this._playlists[index].addTrack(trackId);
    this.emitPlaylists();
  }

  private findPlaylistById(playlistId: number) {
    return this._playlists.findIndex(playlistElement => playlistId === playlistElement.playlistId);
  }

  private findTrackById(trackId: number) {
    return this._tracks.findIndex(trackElement => trackId === trackElement.trackId);
  }

  private emitPlaylists() {
    this._playlistsSubject.next(this._playlists);
  }

  private emitTracks() {
    this._tracksSubject.next(this._tracks);
  }
}
