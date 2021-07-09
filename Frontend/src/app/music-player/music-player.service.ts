import { FilePlayerService } from "./players/file-player.service";
import { Player } from "./players/player.interface";
import { Track } from "../typescript/models/track.model";
import { YoutubePlayerService } from "./players/youtube-player.service";
import { ActivePlaylistService } from "../shared/service/activePlaylist.service";
import { Subscription } from "rxjs";
import { Injectable } from '@angular/core';
import { CurrentTrackDataService } from './current-track-data.service';
import {PlaceholderPlayer} from './players/placeholderPlayer.service';
import {SnackbarService} from '../shared/service/snackbar.service';
import {NGXLogger} from 'ngx-logger';

@Injectable({providedIn: 'root'})
export class MusicPlayerService {
    activePlayer: Player;

    activePlaylistSubscription: Subscription;
    endOfSongSubscription: Subscription;

    trackList: Track[] = [];
    currentIndex: number;

    constructor(
        private activePlaylistService: ActivePlaylistService,
        private filePlayerService: FilePlayerService,
        private youtubePlayerService: YoutubePlayerService,
        private snackbarService: SnackbarService,
        private logger: NGXLogger
    ) {
        this.subscribeToPlaylist();
        this.subscribeToEndSongEmitter();
        this.activePlayer = new PlaceholderPlayer();
    }

    subscribeToPlaylist(): void {
        this.activePlaylistSubscription = this.activePlaylistService.activeTrackListObservable.subscribe(
            list => this.trackList = list
        );
    }

    subscribeToEndSongEmitter(): void {
        this.endOfSongSubscription = CurrentTrackDataService.endTrackObservable.subscribe(
            () => this.songHasEnded()
        );
    }

    loadTrack(index: number): void {
      try {
        this.currentIndex = index;
        this.loadTrackAtCurrentIndex();
      } catch (error) {
        this.handleUnsupportedSourceTypeError(error.message);
        return;
      }
    }


    play(): void {
        CurrentTrackDataService.setPlayingState(true);
        this.activePlayer.play();
    }

    pause(): void {
        CurrentTrackDataService.setPlayingState(false);
        this.activePlayer.pause();
    }

    next(): void {
        try{
            this.upIndex();
            this.loadTrackAtCurrentIndex();
        } catch (error) {
          this.handleUnsupportedSourceTypeError(error.message);
          return;
        }
    }

    previous(): void {
        try{
            this.lowerIndex();
            this.loadTrackAtCurrentIndex();
        } catch (error) {
          this.handleUnsupportedSourceTypeError(error.message);
          return;
        }
    }

    mute(): void {
        this.activePlayer.mute();
    }

    unMute(): void {
        this.activePlayer.unMute();
    }

    setVolume(value: number): void {
        this.activePlayer.setVolume(value);
    }


    private songHasEnded(): void {
        this.next();
        this.play();
    }

    private switchPlayer(selector: string): void {
        switch (selector) {
            case "file":
                this.activateFilePlayer();
                break;
            case "youtube":
                this.activateYoutubePlayer();
                break;
            default:
                throw Error(selector);
        }
    }

    private loadTrackAtCurrentIndex(): void {
        this.activePlayer.stop();
        const track = this.trackList[this.currentIndex];
        this.switchPlayer(track.sourceType);
        this.activePlayer.loadTrack(track);
        CurrentTrackDataService.setTrackText(this.generateTrackText(track));
    }

    private generateTrackText(track: Track) {
      return `${track.trackName} -- ${track.artist} -- ${track.sourceType}`;
    }

    private upIndex(): void {
        this.currentIndex++;
        if (this.currentIndex > (this.trackList.length - 1)) {
            this.currentIndex = 0;
        }
    }

    private lowerIndex(): void {
        this.currentIndex--;
        if ( this.currentIndex < 0) {
            this.currentIndex = this.trackList.length - 1;
        }
    }

    private activateYoutubePlayer(): void {
        this.activePlayer = this.youtubePlayerService;
    }

    private activateFilePlayer(): void {
        this.activePlayer = this.filePlayerService;
    }

    private handleUnsupportedSourceTypeError(type: string) {
      this.logUnsupportedSourceTypeError(type);
      this.showUnsupportedSourceTypeError(type);
    }

    private logUnsupportedSourceTypeError(type: string) {
      this.logger.error(
        `An unsupported source type was used: ${type}`
      );
    }

    private showUnsupportedSourceTypeError(type: string) {
      this.snackbarService.showMessage(
        `This Source Type Is Not Supported: ${type}`,
        3000
      );
    }

}
