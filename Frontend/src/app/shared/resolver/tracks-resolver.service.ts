import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {TrackService} from "../../track/track.service";
import {displayHttpError} from "../../typescript/utils/http-error.util";
import {MatDialog} from "@angular/material/dialog";
import {Datastore} from "../service/datastore.service";

@Injectable({providedIn: "root"})
export class TracksResolver implements Resolve<void> {
  constructor(
    private trackService: TrackService,
    private dataStore: Datastore,
    private matDialog: MatDialog
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<void> | Promise<void> | void {
    this.trackService.getUserTracks().subscribe(
      list => {
        this.dataStore.tracks = list;
      },
      error => displayHttpError(error, this.matDialog)
    );
  }
}
