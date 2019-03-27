import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Router } from '@angular/router';

// 注入到根节点，以便后边的组件都能使用到
// @Injectable() 装饰器会接受该服务的元数据对象，就像 @Component() 对组件类的作用一样。
@Injectable()
export class ApiService {
  constructor(private http: HttpClient, public router: Router) {}

  // 统一的错误处理
  private formatErrors(error: any) {
    // console.log("error", error);
    // location.href = location.origin + location.pathname;
    return throwError(error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http
      .get(`${environment.api_url}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http
      .put(`${environment.api_url}${path}`, JSON.stringify(body))
      .pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http
      .post(
        `${environment.api_url}${path}`,
        JSON.stringify(body) // 或者直接使用 body
      )
      .pipe(
        catchError(this.formatErrors),
        map(data => {
          return data;
        })
      );
  }

  delete(path): Observable<any> {
    return this.http
      .delete(`${environment.api_url}${path}`)
      .pipe(catchError(this.formatErrors));
  }
}
