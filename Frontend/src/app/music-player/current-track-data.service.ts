import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CurrentTrackDataService {

    private static endTrackEmitter: EventEmitter<void> = new EventEmitter<void>();
    private static trackProgressEmitter: EventEmitter<number> = new EventEmitter<number>();
    private static playingEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
    private static trackTextEmitter: EventEmitter<string> = new EventEmitter<string>();

    static endTrack(): void {
        CurrentTrackDataService.endTrackEmitter.emit();
    }

    static updateProgress(value: number): void {
        CurrentTrackDataService.trackProgressEmitter.emit(value);
    }

    static setPlayingState(value: boolean) {
        CurrentTrackDataService.playingEmitter.emit(value);
    }

    static setTrackText(value: string) {
        CurrentTrackDataService.trackTextEmitter.emit(value);
    }

    static get endTrackObservable(): Observable<void> {
        return CurrentTrackDataService.endTrackEmitter.asObservable();
    }

    static get trackProgressObservable(): Observable<number> {
        return CurrentTrackDataService.trackProgressEmitter.asObservable();
    }

    static get playingObservable(): Observable<boolean> {
        return CurrentTrackDataService.playingEmitter.asObservable();
    }

    static get trackTextObservable(): Observable<string> {
        return CurrentTrackDataService.trackTextEmitter.asObservable();
    }
}
