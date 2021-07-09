import { NgModule } from '@angular/core';
import { AppRoutingModule } from "../app.routing-module";
import { MaterialModule } from "./material.module";
import { CommonModule } from '@angular/common';
import {WarningDialogComponent} from "./dialogs/warning-dialog.component";
import {FormDialogComponent} from "./dialogs/form-dialog.component";
import {AddToPlaylistDialogComponent} from './dialogs/add-to-playlist-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from '@angular/material/button';
import {PlaylistFormComponent} from "./forms/playlist-form/playlist-form.component";
import {TrackFromComponent} from "./forms/track-from/track-from.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from "@angular/material/select";
import {UploadTrackComponent} from './dialogs/upload-track/upload-track.component';
import {ConfirmWarnDialogComponent} from './dialogs/confirm-warn-dialog-component.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MaterialFileInputModule} from "ngx-material-file-input";



@NgModule({
  declarations: [
    WarningDialogComponent,
    FormDialogComponent,
    UploadTrackComponent,
    PlaylistFormComponent,
    TrackFromComponent,
    AddToPlaylistDialogComponent,
    ConfirmWarnDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonToggleModule,
    MaterialFileInputModule
  ],
  exports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule

  ]
})
export class SharedModule { }
