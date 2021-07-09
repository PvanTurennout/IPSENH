import {Component, Inject, Input, OnInit, ViewChild} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FileUpload} from '../../../typescript/models/file-upload.model';
import {UploadFilesService} from '../../service/upload-files.service';
import {NGXLogger} from 'ngx-logger';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Track} from "../../../typescript/models/track.model";
import {MatButtonToggleGroup} from "@angular/material/button-toggle";

@Component({
  selector: 'app-form-dialog',
  templateUrl: 'upload-track.component.html',
  styles: [`
    .createTrackWrapper, .form-wrapper{
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 25vw;
    }

    .upload-button {
      float: right;
    }

    mat-button-toggle-group{
      margin-bottom: 10px;
    }
  `]
})

export class UploadTrackComponent implements OnInit {
  title = "Upload a file";
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  enableButton: boolean = false;
  verifiedUrl: boolean = false;

  @Input() track: Track;
  trackFormGroup: FormGroup;

  percentage = 0;

  inputTypeControl = new FormControl("file");
  inputType?: string;

  constructor(
    private dialogRef: MatDialogRef<UploadTrackComponent>,
    private uploadService: UploadFilesService,
    private logger: NGXLogger,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {
      type: string
    }
  ) {
  }

  formInit() {
    this.trackFormGroup = this.formBuilder.group({
      YoutubeURL: [],
      artist: [],
      album: [],
      year: [1969],
      genre: [],
      outline: []
    });
  }

  ngOnInit(): void {
    this.formInit();
  }

  close() {
    this.dialogRef.close();
  }

  getArtistFormValue() {
    return this.trackFormGroup.controls.artist.value;
  }

  getGenreFromValue() {
    return this.trackFormGroup.controls.genre.value;
  }

  getAlbumFromValue() {
    return this.trackFormGroup.controls.album.value;
  }

  getYearFromValue() {
    return this.trackFormGroup.controls.year.value;
  }

  getURLFromValue() {
    return this.trackFormGroup.controls.YoutubeURL.value;
  }

  createTrackObject() {
    return new Track(
      null, null, this.getArtistFormValue(),
      this.inputTypeControl.value, this.getURL(), this.getGenreFromValue(),
      this.getAlbumFromValue(), this.getYearFromValue());
  }

  getURL() {
    if (this.inputTypeControl.value == "file"){
      return null;
    } else {
      return this.getURLFromValue();
    }
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    this.enableButton = true;
  }

  upload(){
    if (this.selectedFiles && this.inputTypeControl.value == "file") {
      this.uploadFile()
    } else if (this.verifiedUrl && this.inputTypeControl.value == "youtube"){
      this.uploadYoutube();
    }
  }

  private uploadFile(){
    const file: File | null = this.selectedFiles.item(0);

    if (file) {
      this.currentFileUpload = new FileUpload(file);
      let trackObject = this.createTrackObject();
      this.uploadService.uploadTrack(trackObject, this.currentFileUpload);
      this.close();
    }
  }

  private uploadYoutube(){
    let trackObject = this.createTrackObject();
    this.uploadService.uploadTrack(trackObject);
    this.close();
  }

  verifyUrl(){
    let url = this.getURL();
    this.enableButton = url.includes("youtube.com");
    this.verifiedUrl = this.enableButton;
    return this.enableButton
  }


}
