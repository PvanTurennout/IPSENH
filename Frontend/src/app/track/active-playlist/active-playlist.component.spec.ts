import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePlaylistComponent } from './active-playlist.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {LoggerTestingModule} from 'ngx-logger/testing';
import {MatDialog} from "@angular/material/dialog";

// describe('ActivePlaylistComponent', () => {
//   let component: ActivePlaylistComponent;
//   let fixture: ComponentFixture<ActivePlaylistComponent>;
//
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ ActivePlaylistComponent ],
//       imports: [HttpClientTestingModule, LoggerTestingModule, MatDialog]
//     })
//     .compileComponents();
//   });
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(ActivePlaylistComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
