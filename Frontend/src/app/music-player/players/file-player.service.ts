import { Player } from "./player.interface";
import { Track } from "../../typescript/models/track.model";
import {CurrentTrackDataService} from "../current-track-data.service";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class FilePlayerService implements Player {

    private player;

    constructor() {
        this.player = new Audio();
        this.setEndTrackMethod();
        this.setProgressMethod();
    }

    loadTrack(track: Track): void {
        this.player.src = track.sourceUri;
    }

    play(): void {
        this.player.play();
    }

    pause(): void {
        this.player.pause();
    }

    stop(): void {
        this.player.pause();
    }

    mute(): void {
        this.player.muted = true;
    }

    unMute(): void {
        this.player.muted = false;
    }

    setVolume(value: number) {
        this.player.volume = value / 100;
    }

    private setProgressMethod(): void {
        this.player.ontimeupdate = () =>
            CurrentTrackDataService.updateProgress( (this.player.currentTime / this.player.duration) * 100);
    }

    private setEndTrackMethod(): void {
        this.player.onended = CurrentTrackDataService.endTrack;
    }
}
