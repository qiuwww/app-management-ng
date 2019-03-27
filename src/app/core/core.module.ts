import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// 用于拦截请求
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';

import {
  ApiService,
  JwtService,
  RequestService,
  RouteConfigService
} from './services';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // 其下的服务需要使用HttpClient，在这里需要引用HttpClientModule
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true // 讓 Angular 知道 HTTP_INTERCEPTORS 是可能有多個程式在處理的。
    },
    ApiService,
    JwtService,
    RequestService,
    RouteConfigService
  ]
})
export class CoreModule { }
