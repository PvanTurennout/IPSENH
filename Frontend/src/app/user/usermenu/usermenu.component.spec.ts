import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermenuComponent } from './usermenu.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {LoggerTestingModule} from 'ngx-logger/testing';
import {MatMenuModule} from '@angular/material/menu';

// describe('UsermenuComponent', () => {
//   let component: UsermenuComponent;
//   let fixture: ComponentFixture<UsermenuComponent>;
//
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ UsermenuComponent ],
//       imports: [RouterTestingModule, HttpClientTestingModule, LoggerTestingModule, MatMenuModule]
//     })
//     .compileComponents();
//   });
//
//   beforeEach(() => {
//     localStorage.setItem('jwtToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsidXNlcklkIjo5LCJ1c2VybmFtZSI6IlBpZXRlciIsInN0YXRlIjpudWxsLCJsaXN0ZW5IaXN0b3J5IjpudWxsLCJzdGFuZGFyZFBsYXlsaXN0SWQiOjEwfSwiaWF0IjoxNjIzMTUzNDUwfQ.y7-2Xs77YnE8o6PhawAC5XXZAbLw-7HX6yJdYb2zlPs');
//     fixture = TestBed.createComponent(UsermenuComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
