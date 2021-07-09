import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Playlist} from '../../typescript/models/playlist.model';
import {PlaylistService} from "../../playlist/playlist.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Datastore} from "../service/datastore.service";
import {Subscription} from "rxjs";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-to-playlist-dialog',
  styles: [``],
  template: `
    <h3>Add Track To Playlist</h3>
    <mat-dialog-content>
        <mat-form-field appearance="outline">

          <mat-label>Playlist</mat-label>

          <mat-select [formControl]="formField">
            <mat-option
              *ngFor="let playlist of playlistList"
              [value]="playlist.playlistId"
            >
              {{playlist.name}}
            </mat-option>
          </mat-select>

        </mat-form-field>
    </mat-dialog-content>

    <mat-dialog-actions>
      <button
        mat-raised-button
        color="warn"
        mat-dialog-close
        class="close-button"
      >
        Cancel
      </button>
      <button
        style="text-align: center"
        mat-raised-button
        color="primary"
        mat-dialog-close
        (click)="submitAdd()"
        [disabled]="formField.invalid"
      >
        Add To Playlist
      </button>
    </mat-dialog-actions>
  `
})


export class AddToPlaylistDialogComponent implements OnInit, OnDestroy {
  playlistList: Playlist[] = [];
  formField: FormControl = new FormControl(null, Validators.required);
  playlistsSubscription: Subscription;

  constructor(
    private playlistService: PlaylistService,
    private datastore: Datastore,
    @Inject(MAT_DIALOG_DATA) public data: {
      trackId: number
    }
  ) {}

  ngOnInit() {
    this.playlistsSubscription = this.datastore.playlistsObservable.subscribe(
      playlists => this.playlistList = playlists
    );
  }

  ngOnDestroy() {
    this.playlistsSubscription.unsubscribe();
  }

  submitAdd() {
    this.playlistService.addToPlaylist(
      {playlistId: this.formField.value, trackId: this.data.trackId}
    );
  }

}
