import {Component, Input, OnInit} from '@angular/core';
import {Playlist} from '../../../typescript/models/playlist.model';
import {ActivePlaylistService} from '../../../shared/service/activePlaylist.service';
import {MatDialog} from '@angular/material/dialog';
import {FormDialogComponent} from '../../../shared/dialogs/form-dialog.component';
import {FormSelectorEnum} from '../../../typescript/enums/form-dialog-selector.enum';

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.css']
})
export class PlaylistListComponent implements OnInit {

  @Input() playlists: Playlist[];

  constructor(
    private activePlaylistService: ActivePlaylistService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  loadPlaylist(playlist: Playlist): void {
    this.activePlaylistService.loadPlaylist(playlist);
  }

  editPlaylist(playlist: Playlist) {
    this.matDialog.open(FormDialogComponent, {
      data: {
        selector: FormSelectorEnum.Playlist,
        object: playlist
      }
    });
  }

}
