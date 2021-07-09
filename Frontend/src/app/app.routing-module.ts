import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./user/login/login.component";
import { RegisterComponent } from "./user/register/register.component";
import { MainComponent } from "./main/main.component";
import {TracksResolver} from "./shared/resolver/tracks-resolver.service";
import {PlaylistsResolver} from "./shared/resolver/playlists-resolver.service";
import {StatsComponent} from "./user/stats/stats.component";

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: MainComponent, resolve: {tracks: TracksResolver, playlists: PlaylistsResolver} },
  { path: 'stats', component: StatsComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
