import { Component, OnInit, OnDestroy } from '@angular/core';
import {Playlist} from '../../typescript/models/playlist.model';
import {PlaylistService} from '../playlist.service';
import {MatDialog} from '@angular/material/dialog';
import {UserService} from "../../user/user.service";
import {Datastore} from "../../shared/service/datastore.service";
import {Subscription} from "rxjs";
import {ActivePlaylistService} from '../../shared/service/activePlaylist.service';
import {FormDialogComponent} from '../../shared/dialogs/form-dialog.component';
import {FormSelectorEnum} from '../../typescript/enums/form-dialog-selector.enum';
import {UploadTrackComponent} from '../../shared/dialogs/upload-track/upload-track.component';

@Component({
  selector: 'app-playlist-overview',
  templateUrl: './playlist-overview.component.html',
  styleUrls: ['./playlist-overview.component.css']
})
export class PlaylistOverviewComponent implements OnInit, OnDestroy {

  playlistsSubscription: Subscription;
  playlists: Playlist[] = [];
  private userStandardPlaylist: Playlist;

  constructor(
    private playlistService: PlaylistService,
    private datastore: Datastore,
    private matDialog: MatDialog,
    private userService: UserService,
    private activePlaylistService: ActivePlaylistService,
  ) { }

  ngOnInit(): void {
    this.subToPlaylists();
  }

  ngOnDestroy() {
    this.playlistsSubscription.unsubscribe();
  }

  subToPlaylists() {
    this.playlistsSubscription = this.datastore.playlistsObservable.subscribe(
      list => {
        for (let i = 0; i < list.length; i++) {
          if (list[i].playlistId === this.userService.getStandardPlaylistId()){
            this.userStandardPlaylist = list[i];
            list.splice(i, 1);
            break;
          }
        }
        this.playlists = list;
      }
    );
  }

  loadUserStandardPlaylist() {
    this.activePlaylistService.loadPlaylist(this.userStandardPlaylist);
  }

  createPlaylist() {
    this.matDialog.open(FormDialogComponent, {
      data: {
        selector: FormSelectorEnum.Playlist,
        object: new Playlist(0, ''),
        isNew: true
      }
    });
  }

  createTrack() {
    this.matDialog.open(UploadTrackComponent, {
      data: {
        type: "null"
      }
    });
  }

}
