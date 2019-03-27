// 应该是用户管理模块
// 服务也不尽是数据请求，也包括本地的数据的处理，相当于controller了吧
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";
@Injectable() // 注入的内容，这里是空置的
export class RequestService {
  constructor(
    // 变量类型 变量名称 变量类型
    private apiService: ApiService
  ) {}
  // 页面登陆
  login(params: Object = {}): Observable<any> {
    return this.apiService.post("/login/login", params);
  }
  // appInfo 获取列表
  getAppInfoList(): Observable<any> {
    return this.apiService.post("/appInfo/list", {});
  }
  createAppInfo(params: Object = {}): Observable<any> {
    return this.apiService.post("/appInfo/save", params);
  }
  // 获取select的选项
  getLoanSelect(): Observable<any> {
    return this.apiService.post("/loanMarket/pull/down", {});
  }
  getLoanTypeSelect(): Observable<any> {
    return this.apiService.post("/loanMarket/pull/down/type", {});
  }
  getAppSelect(): Observable<any> {
    return this.apiService.post("/appInfo/pull/down", {});
  }
  // 获取loan的list
  getLoanList(params: Object = {}): Observable<any> {
    return this.apiService.post("/productConfig/list", params);
  }
  // 保存loan
  createLoan(params: Object = {}): Observable<any> {
    return this.apiService.post("/productConfig/save", params);
  }
  // 获取url的list
  getUrlMapList(params: Object = {}): Observable<any> {
    return this.apiService.post("/urlMap/list", params);
  }
  // 保存url
  createUrlMap(params: Object = {}): Observable<any> {
    return this.apiService.post("/urlMap/save", params);
  }
  // API进件数据查询list /orderInfo/list
  orderInfoList(params: Object = {}): Observable<any> {
    return this.apiService.post("/orderInfo/list", params);
  }
}
