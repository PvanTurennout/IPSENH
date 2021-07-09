import { Track } from "../../typescript/models/track.model";

export interface Player {
    loadTrack(track: Track): void;
    play(): void;
    pause(): void;
    stop(): void;
    mute(): void;
    unMute(): void;
    setVolume(value: number): void;
}
