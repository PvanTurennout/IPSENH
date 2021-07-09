import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { handleHttpErrors } from "../../typescript/utils/http-error.util";
import { NGXLogger } from 'ngx-logger';

@Injectable({ providedIn: "root" })
export class HttpService {
  constructor(
    private http: HttpClient,
    private logger: NGXLogger
  ) { }

  getRequest<T>(uri: string) {
    return this.http.get<{data: T}>(environment.backendUrl + uri)
      .pipe(
        catchError( error => throwError(handleHttpErrors(error, this.logger)))
      );
  }

  postRequest<T>(uri: string, body: any) {
    return this.http.post<{
      data: T}>(environment.backendUrl + uri, body)
      .pipe(
        catchError( error => throwError(handleHttpErrors(error, this.logger)))
      );
  }

  putRequest(uri: string, body: any) {
    return this.http.put(environment.backendUrl + uri, body)
      .pipe(
        catchError( error => throwError(handleHttpErrors(error, this.logger)))
      );
  }

  deleteRequest(uri: string) {
    return this.http.delete(environment.backendUrl + uri)
      .pipe(
        catchError( error => throwError(handleHttpErrors(error, this.logger)))
      );
  }
}
