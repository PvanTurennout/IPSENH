import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormSelectorEnum} from "../../typescript/enums/form-dialog-selector.enum";
import {Playlist} from "../../typescript/models/playlist.model";
import {Track} from "../../typescript/models/track.model";

@Component({
  selector: 'app-form-dialog',
  template: `
    <h2 mat-dialog-title>{{title}}</h2>
    <mat-dialog-content [ngSwitch]="data.selector">
      <div *ngSwitchCase="PLAYLIST">
        <app-playlist-form
          [playlist]="data.object"
          [isNew]="data.isNew"
          (shouldClose)="close()"
        >
        </app-playlist-form>
      </div>
      <div *ngSwitchCase="TRACK">
        <app-track-from [track]="data.object">
        </app-track-from>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-raised-button color="warn" mat-dialog-close class="close-button">Close</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .close-button{
      margin-top: -50%;
    }
  `]
})
export class FormDialogComponent {
  readonly PLAYLIST = FormSelectorEnum.Playlist;
  readonly TRACK = FormSelectorEnum.Track;
  title = this.data.isNew ? 'Create' : 'Edit' + ' ' + FormSelectorEnum[this.data.selector];
  constructor(
    private dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      selector: FormSelectorEnum,
      object: Playlist | Track,
      isNew: boolean
    }
  ) { }

  close() {
    this.dialogRef.close();
  }
}
