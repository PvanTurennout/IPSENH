import { Component, OnInit} from '@angular/core';
import {Track} from '../../typescript/models/track.model';
import {ActivePlaylistService} from '../../shared/service/activePlaylist.service';
import {HttpService} from '../../shared/service/http.service';
import {UserService} from '../../user/user.service';
import {MatDialog} from '@angular/material/dialog';
import {FormDialogComponent} from '../../shared/dialogs/form-dialog.component';
import {FormSelectorEnum} from '../../typescript/enums/form-dialog-selector.enum';
import {AddToPlaylistDialogComponent} from '../../shared/dialogs/add-to-playlist-dialog.component';
import {MusicPlayerService} from '../../music-player/music-player.service';
import {ConfirmWarnDialogComponent} from '../../shared/dialogs/confirm-warn-dialog-component.component';
import {TrackService} from '../track.service';

@Component({
  selector: 'app-active-playlist',
  templateUrl: './active-playlist.component.html',
  styleUrls: ['./active-playlist.component.css']
})
export class ActivePlaylistComponent implements OnInit {

  tracks: Track[] = [];
  displayedColumns: string[] = ['play', 'name', 'artist', 'sourceType', 'edit'];
  baseLocation = 'track';

  constructor(
    private activePlaylistService: ActivePlaylistService,
    private api: HttpService,
    private userService: UserService,
    private matDialog: MatDialog,
    private musicPlayerService: MusicPlayerService,
    private trackService: TrackService,
  ) {
  }

  ngOnInit(): void {

  }

  getTracksObservable() {
    return this.activePlaylistService.activeTrackListObservable;
  }

  playTrack(track: Track, index: number) {
    this.musicPlayerService.loadTrack(index);
    this.musicPlayerService.play();
    this.updateStats(track.trackId, track.genre);
  }

  updateStats(trackId, genre) {
    const userId = this.userService.getCurrentUser().userId;
    this.api.putRequest('users/stats/track', {userId, trackId}).subscribe();
    this.api.putRequest('users/stats/genre', {userId, genre}).subscribe();
  }

  editTrack(track: Track) {
    this.matDialog.open(FormDialogComponent, {
      data: {
        selector: FormSelectorEnum.Track,
        object: track
      }
    });
  }

  addToPlaylist(trackId: number) {
    this.matDialog.open(AddToPlaylistDialogComponent, {data: {trackId}});
  }

  deleteTrack(track: Track) {
    const dialogRef = this.matDialog.open(ConfirmWarnDialogComponent, {
      data: {
        title: "Delete track",
        text: "Are you sure you want to delete this track?",
        buttonText: "Delete"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.trackService.deleteTrack(track);
        }
      }
    );


  }

}
