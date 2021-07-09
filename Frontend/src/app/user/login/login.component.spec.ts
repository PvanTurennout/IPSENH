import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpService } from "../../shared/service/http.service";
import {UserService} from "../user.service";

import { LoginComponent } from './login.component';

// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;
//
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ LoginComponent ]
//     })
//     .compileComponents();
//   });
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(LoginComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it("should flag as invalid when no credentials given", () => {
//     component.loginForm.reset();
//     expect(component.loginForm.valid).toBe(false);
//   });
// });
