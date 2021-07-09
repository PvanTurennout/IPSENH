import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatsComponent } from './stats.component';
import {SnackbarService} from '../../shared/service/snackbar.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {UserService} from '../user.service';
import {LoggerTestingModule} from 'ngx-logger/testing';

// describe('StatsComponent', () => {
//   let component: StatsComponent;
//   let fixture: ComponentFixture<StatsComponent>;
//
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ StatsComponent ],
//       imports: [HttpClientTestingModule, MatSnackBarModule, LoggerTestingModule],
//       providers: [UserService, SnackbarService, MatSnackBarModule, MatSnackBar]
//     })
//     .compileComponents();
//   });
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(StatsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
