import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YoutubePlayerHostComponent } from './youtube-player-host/youtube-player-host.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { ReactiveFormsModule } from '@angular/forms';
import { PlayerControlsComponent } from './player-controls/player-controls.component';
import {MatButtonModule} from "@angular/material/button";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSliderModule} from "@angular/material/slider";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    YoutubePlayerHostComponent,
    PlayerControlsComponent
  ],
  imports: [
    CommonModule,
    YouTubePlayerModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSliderModule,
    MatIconModule
  ],
  exports: [
    YoutubePlayerHostComponent,
    PlayerControlsComponent
  ]
})
export class MusicPlayerModule { }
