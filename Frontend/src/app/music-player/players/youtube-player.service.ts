import { Injectable } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { Player } from "./player.interface";
import { Track } from "../../typescript/models/track.model";
import { interval, Observable, Subscription } from 'rxjs';
import { CurrentTrackDataService } from '../current-track-data.service';

@Injectable({providedIn: 'root'})
export class YoutubePlayerService implements Player {

    private playerReference: YouTubePlayer;
    private playerEventSubscription: Subscription;

    private progressObservable: Observable<number> = interval(500);
    private progressSubscription: Subscription;

    constructor() {
        this.getYoutubeIframeAPI();
    }

    loadTrack(track: Track): void {
        this.playerReference.videoId = this.extractVideoId(track.sourceUri);

    }

    play(): void {
        this.playerReference.playVideo();
    }

    pause(): void {
        this.playerReference.pauseVideo();
    }

    stop(): void {
        this.playerReference.stopVideo();
    }

    mute(): void {
        this.playerReference.mute();
    }

    unMute(): void {
        this.playerReference.unMute();
    }

    setVolume(value: number): void {
        this.playerReference.setVolume(value);
    }

    set player(value: YouTubePlayer) {
        this.playerReference = value;
        this.playerReference.height = 1;
        this.playerReference.width = 1;
        this.subscribeToPlayerEvents();
    }

    private subscribeToPlayerEvents(): void {
        this.playerEventSubscription = this.playerReference.stateChange.subscribe(
            thing => {
                if (thing.data === YT.PlayerState.ENDED) {
                    this.progressSubscription.unsubscribe();
                    CurrentTrackDataService.endTrack();
                }

                if (thing.data === YT.PlayerState.UNSTARTED) {
                    this.startProgressUpdate();
                }
            }
        );
    }

    private startProgressUpdate(): void {
        this.progressSubscription = this.progressObservable.subscribe(
            () => this.updateProgress()
        );
    }

    updateProgress(): void {
        CurrentTrackDataService.updateProgress(this.calculateProgress());
    }

    private calculateProgress(): number {
        return (this.playerReference.getCurrentTime() / this.playerReference.getDuration()) * 100;
    }

    private getYoutubeIframeAPI(): void {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.append(tag);
    }

    private extractVideoId(uri: string): string {
        const query = uri.split('?')[1];
        const videoPart = query.split('&')[0];
        return videoPart.split('=')[1];
    }
}
