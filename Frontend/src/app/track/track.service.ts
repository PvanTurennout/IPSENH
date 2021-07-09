import {Injectable} from '@angular/core';
import {HttpService} from '../shared/service/http.service';
import {Track, TrackDTO} from '../typescript/models/track.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {displayHttpError} from '../typescript/utils/http-error.util';
import {MatDialog} from '@angular/material/dialog';
import {Datastore} from '../shared/service/datastore.service';
import {ActivePlaylistService} from '../shared/service/activePlaylist.service';
import {SnackbarService} from '../shared/service/snackbar.service';

@Injectable({providedIn: 'root'})
export class TrackService {
  baseLocation = "track";

  constructor(
    private httpService: HttpService,
    private matDialog: MatDialog,
    private datastore: Datastore,
    private activePlaylistService: ActivePlaylistService,
    private snackbar: SnackbarService
  ) { }

  static mapTracks(trackDTOs: TrackDTO[]): Track[] {
    if (!trackDTOs) {
      return [];
    }
    const tracks: Track[] = [];
    for (const trackToBe of trackDTOs) {
      tracks.push(Track.trackFromDTO(trackToBe));
    }
    return tracks;
  }

  getUserTracks(): Observable<Track[]> {
    return this.httpService.getRequest<TrackDTO[]>('track/playlist')
      .pipe(
        map(response => TrackService.mapTracks(response.data) )
      );
  }

  getTrackIdsFromPlaylist(playlistIds: number[]) {
    return this.httpService.postRequest<{[id: number]: number[]}[]>('track/playlist/ids', playlistIds)
      .pipe(
        map(data => data.data)
      );
  }


  getAListOfTracks() {
    const trackList: Track[] = [];
    this.getUserTracks().subscribe(
      list => list.map(item => trackList.push(item)),
      error => displayHttpError(error, this.matDialog)
    );
    return trackList;
  }

  updateTrack(track: Track) {
    this.updateTrackRequest(track).subscribe(
      () => this.updateTrackLocal(track),
      error => displayHttpError(error, this.matDialog)
    );
  }

  private updateTrackLocal(track: Track) {
    this.updateTrackInDatastore(track);
    this.updateTrackInActivePlaylist(track);
  }

  private updateTrackInDatastore(track: Track) {
    this.datastore.updateTrack(track);
  }

  private updateTrackInActivePlaylist(track: Track) {
    this.activePlaylistService.updateTrack(track);
  }

  private updateTrackRequest(track: Track) {
    return this.httpService.putRequest('track/', track.toTrackDTO());
  }

  deleteTrack(track: Track) {
    this.deleteTrackRequest(track).subscribe(
      res => {
        this.deleteTrackFromActivePlaylist(track);
        this.snackbar.showMessage("Track was deleted", 2000);
      },
      error => {
        this.snackbar.showMessage('Track: ' + track.trackName + ' was not deleted due to an error', 4000);
      }
    );
  }

  private deleteTrackRequest(track: Track) {
    return this.httpService.deleteRequest(this.baseLocation + "/delete/" + track.trackId);
  }

  private deleteTrackFromActivePlaylist(track: Track){
    this.activePlaylistService.deleteTrack(track);
  }

  addTrack(trackObject: Track) {
    this.activePlaylistService.addTrack(trackObject);
  }
}
