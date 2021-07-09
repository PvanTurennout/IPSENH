import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {HttpService} from "../../shared/service/http.service";
import {SnackbarService} from "../../shared/service/snackbar.service";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  tracks: any;
  genres: any;
  constructor(private userService: UserService, private api: HttpService, private snackbar: SnackbarService) { }

  ngOnInit(): void {
    this.getTrackStats();
    this.getGenreStats();
  }

  private getTrackStats() {
    const id = this.userService.getCurrentUser().userId;
    return this.api.getRequest('users/stats/track/' + id).subscribe(
      res => {
        this.tracks = res.data;
      },
      error => {
        // logger.log(error);
        this.snackbar.showMessage("No data could be retrieved for this user");
      }
    );
  }

  private getGenreStats() {
    const id = this.userService.getCurrentUser().userId;
    return this.api.getRequest('users/stats/genre/' + id).subscribe(
      res => {
        this.genres = res.data;
      },
      error => {
        // logger.log(error);
        this.snackbar.showMessage("No data could be retrieved for this user");
      }
    );
  }
}
