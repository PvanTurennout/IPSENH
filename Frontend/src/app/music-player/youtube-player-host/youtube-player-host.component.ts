import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { YoutubePlayerService } from '../players/youtube-player.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'music-player-youtube-host',
  templateUrl: './youtube-player-host.component.html',
  styleUrls: ['./youtube-player-host.component.css']
})
export class YoutubePlayerHostComponent implements OnInit, AfterViewInit {

  @ViewChild(YouTubePlayer) playerReference: YouTubePlayer;

  constructor(private ytPlayerService: YoutubePlayerService){}

  ngOnInit() {}

  ngAfterViewInit(): void{
    this.ytPlayerService.player = this.playerReference;
  }

}
