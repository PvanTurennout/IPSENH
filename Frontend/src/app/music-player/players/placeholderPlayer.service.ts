import {Player} from './player.interface';
import { Track } from '../../typescript/models/track.model';

export class PlaceholderPlayer implements Player {
    loadTrack(track: Track): void {
        // PlaceHolder
    }
    play(): void {
        // PlaceHolder
    }
    pause(): void {
        // PlaceHolder
    }
    stop(): void {
        // PlaceHolder
    }
    mute(): void {
        // PlaceHolder
    }
    unMute(): void {
        // PlaceHolder
    }
    setVolume(value: number): void {
        // PlaceHolder
    }
}
