import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistListComponent } from './playlist-list.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {LoggerTestingModule} from 'ngx-logger/testing';
import {MatDialog} from "@angular/material/dialog";

// describe('PlaylistListComponent', () => {
//   let component: PlaylistListComponent;
//   let fixture: ComponentFixture<PlaylistListComponent>;
//
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ PlaylistListComponent ],
//       imports: [HttpClientTestingModule, LoggerTestingModule, MatDialog]
//     })
//     .compileComponents();
//   });
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(PlaylistListComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
