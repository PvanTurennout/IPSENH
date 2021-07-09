import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {FileUpload} from '../../typescript/models/file-upload.model';
import {HttpService} from './http.service';
import {UserService} from '../../user/user.service';
import {SnackbarService} from './snackbar.service';
import {TrackService} from "../../track/track.service";
import {Track} from "../../typescript/models/track.model";

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {
  private baseUrl = "track";
  private basePath = '/uploads';

  private uploadName;
  private uploadUrl;


  constructor(
    private http: HttpService,
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private user: UserService,
    private snackbar: SnackbarService,
    private trackService: TrackService
  ) { }

  uploadTrack(trackObject: Track, fileUpload?: FileUpload){
    if (trackObject.sourceType == "file"){
      this.pushFileToStorage(trackObject, fileUpload)

    } else if (trackObject.sourceType == "youtube"){
      this.saveYoutubeData(trackObject);
    }
  }


  private pushFileToStorage(trackObject: Track, fileUpload: FileUpload){
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(trackObject, fileUpload);
        });
      })
    ).subscribe();
  }

  private saveFileData(trackObject: Track, fileUpload?: FileUpload){
    return this.http.postRequest(this.baseUrl + '/', {
      trackName: fileUpload.name,
      artist: trackObject.artist,
      sourceType: trackObject.sourceType,
      album: trackObject.album,
      year: trackObject.year,
      genre: trackObject.genre,
      sourceUrl: fileUpload.url,
      defaultPlaylist: this.user.getCurrentUser().standardPlaylistId
    }).subscribe(
      res => {
        this.snackbar.showMessage('File: ' + fileUpload.name + ' was successfully uploaded', 2000);
        // @ts-ignore
        let filledTrackObject = UploadFilesService.fillTrackObjectFile(fileUpload, trackObject, res.data.trackId);
        this.trackService.addTrack(filledTrackObject);
      },
      error => {
        this.snackbar.showMessage('File: ' + fileUpload.name + ' was not uploaded due to an error', 4000);
      }
    );
  }

  private saveYoutubeData(trackObject: Track){
    return this.http.postRequest(this.baseUrl + '/', {
      trackName: trackObject.sourceUri,
      artist: trackObject.artist,
      sourceType: trackObject.sourceType,
      album: trackObject.album,
      year: trackObject.year,
      genre: trackObject.genre,
      sourceUrl: trackObject.sourceUri,
      defaultPlaylist: this.user.getCurrentUser().standardPlaylistId
    }).subscribe(
      res => {
        this.snackbar.showMessage('YouTube link: ' + trackObject.sourceUri + ' was successfully uploaded', 2000);
        // @ts-ignore
        let filledTrackObject = UploadFilesService.fillTrackObjectYoutube(trackObject, res.data.trackId);
        this.trackService.addTrack(filledTrackObject);
      },
      error => {
        this.snackbar.showMessage('YouTube link: ' + trackObject.sourceUri + ' was not uploaded due to an error', 4000);
      }
    );
  }

  private static fillTrackObjectFile(fileUpload: FileUpload, trackObject: Track, trackId: number){
    return new Track(
      trackId, fileUpload.name, trackObject.artist,
      trackObject.sourceType, fileUpload.url, trackObject.genre,
      trackObject.album, trackObject.year);
  }

  private static fillTrackObjectYoutube(trackObject: Track, trackId:number){
    return new Track(
      trackId, trackObject.sourceUri, trackObject.artist,
      trackObject.sourceType, trackObject.sourceUri, trackObject.genre,
      trackObject.album, trackObject.year);
  }
}
