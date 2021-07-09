import {Injectable} from '@angular/core';
import {Playlist} from '../../typescript/models/playlist.model';
import {Track} from '../../typescript/models/track.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {Datastore} from './datastore.service';
import {UserService} from '../../user/user.service';

@Injectable({providedIn: 'root'})
export class ActivePlaylistService {
  private activePlaylist: Playlist;
  private activeTrackList: Track[];

  private _activePlaylistSubject: BehaviorSubject<Playlist> = new BehaviorSubject<Playlist> (null);
  private _activeTrackListSubject: BehaviorSubject<Track[]> = new BehaviorSubject<Track[]>([]);
  private _activePlaylistNameSubject: BehaviorSubject<string> = new BehaviorSubject<string>("Favorites");

  constructor(
    private datastore: Datastore,
    private userService: UserService
  ) {}

  public loadPlaylist(playlist: Playlist) {
    this.setPlaylist(playlist);

    if (playlist.playlistId === this.userService.getStandardPlaylistId()) {
      this._activePlaylistNameSubject.next("Favorites");
      this.loadUserStandardPlaylistTracks();
    } else {
      this.emitName();
      this.loadTrackList();
    }
  }

  public loadUserStandardPlaylistTracks() {
    this.setActiveTrackList(this.datastore.tracksSubject.value);
  }

  public updateTrack(track: Track) {
    const index = this.activeTrackList.findIndex(trackElement => track.trackId === trackElement.trackId);
    this.activeTrackList[index] = track;
    this.emitTrackList();
  }

  public deleteTrack(track: Track) {
    this.activeTrackList.splice(this.activeTrackList.indexOf(track), 1);

    this.activePlaylist.removeTrack(track.trackId);
    this.datastore.updatePlaylist(this.activePlaylist);

    this.emitTrackList();
  }

  public addTrack(track: Track) {
    this.activeTrackList.push(track);

    this.activePlaylist.addTrack(track.trackId);
    this.datastore.updatePlaylist(this.activePlaylist);

    this.emitTrackList();
  }


  public updatePlaylist(playlist: Playlist){
    if (this.activePlaylist.playlistId === playlist.playlistId) {
      this.activePlaylist = playlist;
      this.emitPlaylist();
      this.emitName();
    }
  }


  get activeTrackListObservable(): Observable<Track[]> {
    return this._activeTrackListSubject.asObservable();
  }

  get activePlaylistNameObservable(): Observable<string> {
    return this._activePlaylistNameSubject.asObservable();
  }

  private loadTrackList() {
    const tracks = this.datastore.tracksSubject.value;
    const trackIds = this.activePlaylist.tracks;

    const trackList = tracks.filter( (track) => {
        for (const id of trackIds) {
          if (track.trackId === id) {
            return track;
          }
        }
    });

    this.setActiveTrackList(trackList);
  }


  private emitName() {
    this._activePlaylistNameSubject.next(this.getActivePlaylistName());
  }

  private emitPlaylist() {
    this._activePlaylistSubject.next(this.activePlaylist);
  }

  private emitTrackList() {
    this._activeTrackListSubject.next(this.activeTrackList);
  }


  private getActivePlaylistName(): string {
    return this.activePlaylist.name;
  }

  private setPlaylist(playlist: Playlist) {
    this.activePlaylist = playlist;
    this.emitPlaylist();
  }

  private setActiveTrackList(list: Track[]){
    this.activeTrackList = list;
    this.emitTrackList();
  }
}
