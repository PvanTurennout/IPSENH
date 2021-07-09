import {Injectable} from '@angular/core';
import {Playlist, PlaylistDTO} from '../typescript/models/playlist.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {HttpService} from '../shared/service/http.service';
import {Datastore} from '../shared/service/datastore.service';
import {ActivePlaylistService} from '../shared/service/activePlaylist.service';
import {displayHttpError} from '../typescript/utils/http-error.util';
import {MatDialog} from '@angular/material/dialog';
import {SnackbarService} from "../shared/service/snackbar.service";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService{

  constructor(
    private httpService: HttpService,
    private datastore: Datastore,
    private activePlaylistService: ActivePlaylistService,
    private matDialog: MatDialog,
    private snackbar: SnackbarService
  ) {}

  static mapPlaylists(playlistDTOs: PlaylistDTO[]) {
    if (!playlistDTOs) {
      return [];
    }
    const playlists: Playlist[] = [];
    for (const item of playlistDTOs) {
      playlists.push(Playlist.playlistFromDTO(item));
    }
    return playlists;
  }

  public getUsersPlaylists(): Observable<Playlist[]>{
    return this.httpService.getRequest<PlaylistDTO[]>('playlist/user')
      .pipe(
        map(list => PlaylistService.mapPlaylists(list.data) )
      );
  }


  public createPlaylist(playlist: Playlist) {
    this.createPlaylistRequest(playlist).subscribe(
      response => {
        // @ts-ignore
        playlist.playlistId = response.data.playlistId;
        playlist.tracks = [];
        this.createPlaylistLocal(playlist);
      },
      error => displayHttpError(error, this.matDialog)
    );
  }

  private createPlaylistRequest(playlist: Playlist) {
    return this.httpService.postRequest<number>('playlist/', playlist);
  }

  private createPlaylistLocal(playlist: Playlist) {
    this.datastore.addPlaylist(playlist);
  }


  public updatePlaylist(playlist: Playlist) {
    this.updatePlaylistRequest(playlist).subscribe(
      () => this.updatePlaylistLocal(playlist),
      error => displayHttpError(error, this.matDialog)
    );
  }

  private updatePlaylistLocal(playlist: Playlist) {
    this.updatePlaylistInDatastore(playlist);
    this.updatePlaylistInActivePlaylist(playlist);
  }

  private updatePlaylistInDatastore(playlist: Playlist) {
    this.datastore.updatePlaylist(playlist);
  }

  private updatePlaylistInActivePlaylist(playlist: Playlist) {
    this.activePlaylistService.updatePlaylist(playlist);
  }

  private updatePlaylistRequest(playlist: Playlist) {
    return this.httpService.putRequest('playlist/', playlist.toPlaylistDTO());
  }


  public addToPlaylist(payload: {playlistId: number, trackId: number}) {
    this.addToPlaylistRequest(payload).subscribe(
      response => {
        this.addToPlaylistLocal(payload);
      },error => {
        if (error == "The provided track is already in the target playlist"){this.snackbar.showMessage(error, 4000)}
        else {displayHttpError(error, this.matDialog);}
      }
    );
  }

  private addToPlaylistRequest(payload: {playlistId: number, trackId: number}) {
    return this.httpService.postRequest('track/playlist/add', payload);
  }

  private addToPlaylistLocal(payload: {playlistId: number, trackId: number}) {
    this.datastore.addToPlaylist(payload.playlistId, payload.trackId);
  }

}
