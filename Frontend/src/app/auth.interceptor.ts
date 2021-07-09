import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { UserService} from "./user/user.service";
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpService} from "./shared/service/http.service";
import { Router } from '@angular/router';
import { SnackbarService } from "./shared/service/snackbar.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private userService: UserService,
    private httpService: HttpService,
    private router: Router,
    private snackbar: SnackbarService) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.checkUserLoggedIn()) {
      return next.handle(req);
    }

    const jwtToken = this.userService.getJwtToken();
    const tokenReq = this.signRequestWithToken(req, jwtToken);

    return next.handle(tokenReq).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  checkUserLoggedIn() {
    return this.userService.checkUserLoggedIn();
  }

  signRequestWithToken(req: HttpRequest<any>, jwtToken: string) {
    return req.clone({
      headers: req.headers.set('Authorization', `Bearer ${jwtToken}`)
    });
  }

  private saveJwt(res: any) {
    this.userService.saveJwt(res);
    return res.jwtToken;
  }
}
