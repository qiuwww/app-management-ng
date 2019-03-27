import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class RouteConfigService {
  constructor() {}
  public menu: Array<any> = [
    {

      path: "/pages/app-management",
      title: "App管理",
      type: "appstore"
    },
    {
      path: "/pages/loan-supermarket",
      title: "贷超上架配置管理",
      type: "setting"
    },
    {
      path: "/pages/url-setting",
      title: "URL映射配置",
      type: "link"
    },
    {
      path: "/pages/api-submit-data",
      title: "API进件数据",
      type: "database"
    }
  ];
  getMenuConfig(): Array<any> {
    return this.menu;
  }
}
