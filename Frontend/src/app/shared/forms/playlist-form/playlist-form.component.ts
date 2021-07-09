import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Playlist} from '../../../typescript/models/playlist.model';
import {PlaylistService} from '../../../playlist/playlist.service';

@Component({
  selector: 'app-playlist-form',
  templateUrl: './playlist-form.component.html',
  styleUrls: ['./playlist-form.component.css', '../forms.css']
})
export class PlaylistFormComponent implements OnInit {

  @Input() playlist: Playlist;
  @Input() isNew: boolean;
  @Output() shouldClose: EventEmitter<void> = new EventEmitter<void>();
  playlistFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private playlistService: PlaylistService
  ) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.playlistFormGroup = this.formBuilder.group({
      name: [this.playlist.name, this.validators()]
    });
  }

  validators() {
    return [Validators.required, Validators.minLength, Validators.maxLength(100)];
  }

  getPlaylistModel() {
    return new Playlist(this.playlist.playlistId, this.getPlaylistNameFormValue());
  }

  getPlaylistNameFormValue() {
    return this.playlistFormGroup.controls.name.value;
  }

  submit() {
    if (this.isNew) {
      this.playlistService.createPlaylist(this.getPlaylistModel());
    } else {
      this.playlistService.updatePlaylist(this.getPlaylistModel());
    }
    this.shouldClose.emit();
  }

}
