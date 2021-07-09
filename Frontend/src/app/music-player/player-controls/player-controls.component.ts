import { MusicPlayerService } from "../music-player.service";
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { CurrentTrackDataService } from "../current-track-data.service";

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'music-player-controls',
  templateUrl: './player-controls.component.html',
  styleUrls: ['./player-controls.component.css']
})
export class PlayerControlsComponent implements OnInit, OnDestroy {

  trackProgress = 0;
  isPlaying = false;
  muted = false;
  trackText = "Name -- Artist -- Platform";
  volumeSlider: FormControl = new FormControl(100);

  private trackProgressSubscription: Subscription;
  private playingSubscription: Subscription;
  private trackTextSubscription: Subscription;

  constructor(
    private musicPlayerService: MusicPlayerService
  ) { }

  ngOnInit(): void {
    this.subscribeToTrackProgress();
    this.subscribeToIsPlaying();
    this.subscribeToTrackText();
  }

  ngOnDestroy(): void {
    this.trackProgressSubscription.unsubscribe();
    this.playingSubscription.unsubscribe();
    this.trackTextSubscription.unsubscribe();
  }


  onPlayPauseButton(): void {
    if (this.isPlaying) {
      this.musicPlayerService.pause();
    } else {
      this.musicPlayerService.play();
    }
  }

  onNextButton(): void {
    this.musicPlayerService.next();
  }

  onPreviousButton(): void {
    this.musicPlayerService.previous();
  }

  onMute(): void {
    if (this.muted) {
      this.musicPlayerService.unMute();
    } else {
      this.musicPlayerService.mute();
    }
    this.muted = !this.muted;
  }

  onVolumeChange(): void {
    this.musicPlayerService.setVolume(this.volumeSlider.value);
  }


  private subscribeToTrackProgress(): void {
    this.trackProgressSubscription = CurrentTrackDataService.trackProgressObservable.subscribe(
      progress => {
        if (progress) {
          this.trackProgress = progress;
        }
      }
    );
  }

  private subscribeToIsPlaying(): void {
    this.playingSubscription = CurrentTrackDataService.playingObservable.subscribe(
      playing => this.isPlaying = playing
    );
  }

  private subscribeToTrackText(): void {
    this.trackTextSubscription = CurrentTrackDataService.trackTextObservable.subscribe(
      text => this.trackText = text
    );
  }
}
