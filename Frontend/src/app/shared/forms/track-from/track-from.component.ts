import {Component, Input, OnInit} from '@angular/core';
import {Track} from '../../../typescript/models/track.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TrackService} from '../../../track/track.service';

@Component({
  selector: 'app-track-from',
  templateUrl: './track-from.component.html',
  styleUrls: ['./track-from.component.css', '../forms.css']
})
export class TrackFromComponent implements OnInit {

  @Input() track: Track;
  trackFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private trackService: TrackService
  ) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.trackFormGroup = this.formBuilder.group({
      trackName: [this.track.trackName, this.validators()],
      artist:    [this.track.artist,    this.validators()],
      album:     [this.track.album],
      year:      [this.track.year],
      genre:     [this.track.genre]
    });
  }

  validators() {
    return [Validators.required, Validators.minLength, Validators.maxLength(100)];
  }

  getUpdatedTrackObject() {
    return new Track(
      this.track.trackId, this.getTrackNameFormValue(), this.getArtistFormValue(),
      this.track.sourceType, this.track.sourceUri, this.getGenreFromValue(),
      this.getAlbumFromValue(), this.getYearFromValue());
  }

  getTrackNameFormValue() {
    return this.trackFormGroup.controls.trackName.value;
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

  submit() {
    this.trackService.updateTrack(this.getUpdatedTrackObject());
  }

}
