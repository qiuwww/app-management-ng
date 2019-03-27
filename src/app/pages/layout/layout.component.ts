import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouteConfigService } from "../../core/services/route-config.service";
@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.less"]
})
export class LayoutComponent implements OnInit {
  isCollapsed = false;
  triggerTemplate = null;
  currentTitle: string;
  menu = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public routeConfigService: RouteConfigService
  ) {
    this.menu = this.routeConfigService.getMenuConfig();
  }
  ngOnInit() {
    // this.initMenuSelected();
  }
  @ViewChild("trigger") customTrigger: TemplateRef<void>;
  /** custom trigger can be TemplateRef **/
  // 这里只是定义右边的箭头
  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }
  pageChange($event): void {
    console.log(this, $event);
  }
  initMenuSelected(currentPath = ""): void {
    console.log(currentPath);
  }
  // 每当新组件实例化之后，路由出口就会发出一个激活事件
  onActivate(): void {
    let hash = location.hash.slice(1);
    let menu = this.menu || [];
    menu.filter(item => {
      if (hash === item.path) {
        this.currentTitle = item.title;
      }
    });
  }
}
