import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../../shared/service/snackbar.service';
import { Router } from "@angular/router";
import { UserService } from "../user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hidePassword = true;

  loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    },
    [Validators.required, Validators.maxLength(255)]
  );

  constructor(public userService: UserService, private router: Router, private snackbar: SnackbarService) { }

  ngOnInit(): void {
    if (this.userService.checkUserLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  onLogin() {
    if (!this.checkFormValidity()) {
      return;
    }

    this.userService.login(this.loginForm.value, (response, isFailed) => {
      if (isFailed) {
        this.handleLoginFail();
        return;
      }

      this.handleLoginSuccess();
    });
  }

  private handleLoginSuccess() {
    this.router.navigate(['/home']);
  }

  private handleLoginFail() {
    this.snackbar.showMessage('Failed to log in...', 2000);
  }

  checkFormValidity() {
    return this.loginForm.valid;
  }
}
