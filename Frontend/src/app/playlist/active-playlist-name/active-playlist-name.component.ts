import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivePlaylistService} from '../../shared/service/activePlaylist.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-active-playlist-name',
  templateUrl: './active-playlist-name.component.html',
  styleUrls: ['./active-playlist-name.component.css']
})
export class ActivePlaylistNameComponent implements OnInit, OnDestroy {

  activePlaylistName = "";
  activePlaylistNameSubscription: Subscription;


  constructor(private activePlaylistService: ActivePlaylistService) { }

  ngOnInit(): void {
    this.activePlaylistNameSubscription = this.activePlaylistService.activePlaylistNameObservable.subscribe(
      name => this.activePlaylistName = name
    );
  }

  ngOnDestroy() {
    this.activePlaylistNameSubscription.unsubscribe();
  }

}
