import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing-module';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './user/login/login.component';
import { MainComponent } from './main/main.component';
import { HttpClientModule } from "@angular/common/http";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { RegisterComponent } from './user/register/register.component';
import { BackgroundComponent } from './user/background/background.component';
import { UsermenuComponent } from './user/usermenu/usermenu.component';
import { StatsComponent } from './user/stats/stats.component';
import {PlaylistOverviewComponent} from './playlist/playlist-overview/playlist-overview.component';
import {MatListModule} from '@angular/material/list';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {PlaylistListComponent} from './playlist/playlist-overview/playlist-list/playlist-list.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ActivePlaylistComponent} from './track/active-playlist/active-playlist.component';
import {MatTableModule} from '@angular/material/table';
import {ActivePlaylistNameComponent} from './playlist/active-playlist-name/active-playlist-name.component';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {environment} from '../environments/environment';
import {MatMenuModule} from '@angular/material/menu';
import {MatRadioModule} from '@angular/material/radio';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {MusicPlayerModule} from "./music-player/music-player.module";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    RegisterComponent,
    BackgroundComponent,
    UsermenuComponent,
    StatsComponent,
    BackgroundComponent,
    AppComponent,
    PlaylistOverviewComponent,
    PlaylistListComponent,
    ActivePlaylistComponent,
    ActivePlaylistNameComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    // set to a higher NgxLoggerLevel when in production
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR,
      serverLoggingUrl: environment.backendUrl + 'frontend-log',
      disableFileDetails: true,
      disableConsoleLogging: environment.production
    }),
    AppRoutingModule,
    MatListModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    HttpClientModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatMenuModule,
    MatRadioModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    MusicPlayerModule
  ],

  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
