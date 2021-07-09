import { Injectable } from "@angular/core";
import { HttpService } from "../shared/service/http.service";
import { User } from './user';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private resourcePath: string;

  constructor(
    private api: HttpService
  ) {
    this.resourcePath = 'users';
  }

  login(user: User, loginCallback) {
    return this.api.postRequest(this.resourcePath + '/login', user).subscribe(
      res => {
        this.saveJwt(res);
        loginCallback();
      },
      error => {
        loginCallback(error, true);
      }
    );
  }

  logout() {
    localStorage.removeItem('jwtToken');
  }

  registerUser(user: User, registerCallback) {
    return this.api.postRequest(this.resourcePath + '/register', user).subscribe(
      () => {
        registerCallback();
      }, () => {

        registerCallback(true);
      }
    );
  }

  getCurrentUser() {
    // A JWT token contains all user info
    return this.decodeJwt();
  }

  checkUserLoggedIn() {
    return localStorage.getItem('jwtToken') != null;
  }

  saveJwt(res: any) {
    const jwtToken = res.token;
    localStorage.setItem('jwtToken', jwtToken);
  }

  getJwtToken() {
    return localStorage.getItem('jwtToken');
  }

  // Decodes and returns the payload of a JWT token
  private decodeJwt() {
    const jwtToken = this.getJwtToken();
    if (jwtToken === null || jwtToken === undefined || jwtToken.length === 0) {
      return '';
    }
    const base64Payload = jwtToken.split('.')[1];
    const stringPayload = atob(base64Payload);

    return JSON.parse(stringPayload).result;
  }

  getStandardPlaylistId() {
    const jwtPayload = this.decodeJwt();
    return jwtPayload.standardPlaylistId;
  }

}


