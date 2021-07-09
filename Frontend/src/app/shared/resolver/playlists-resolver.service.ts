import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {PlaylistService} from "../../playlist/playlist.service";
import {Datastore} from "../service/datastore.service";
import {MatDialog} from "@angular/material/dialog";
import {Playlist} from "../../typescript/models/playlist.model";
import {displayHttpError} from "../../typescript/utils/http-error.util";
import {TrackService} from "../../track/track.service";
import {ActivePlaylistService} from "../service/activePlaylist.service";
import {UserService} from '../../user/user.service';

@Injectable({providedIn: "root"})
export class PlaylistsResolver implements Resolve<void> {
  constructor(
    private playlistService: PlaylistService,
    private trackService: TrackService,
    private datastore: Datastore,
    private matDialog: MatDialog,
    private activePlaylistService: ActivePlaylistService,
    private userService: UserService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<void> | Promise<void> | void {
    this.playlistService.getUsersPlaylists().subscribe(
      list => this.populatePlaylists(list),
      error => displayHttpError(error, this.matDialog)
    );
  }

  populatePlaylists(playlistList: Playlist[]) {
    const playlistIds: number[] = [];
    let trackIdsObject;

    playlistList.forEach(
      playlist => playlistIds.push(playlist.playlistId)
    );

    this.trackService.getTrackIdsFromPlaylist(playlistIds).subscribe(
      result => {
        trackIdsObject = result;

        playlistList.forEach(
          playlist => playlist.tracks = trackIdsObject[playlist.playlistId]
        );

        this.datastore.playlists = playlistList;
        this.activePlaylistService.loadPlaylist(new Playlist(this.userService.getStandardPlaylistId(), "Favorites"));
      },
      error => displayHttpError(error, this.matDialog)
    );
  }
}
