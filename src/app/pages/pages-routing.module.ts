// ng g module pages/pages-routing --module pages/pages --flat
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";
import { AppComponent } from "./app/app.component";
import { LoanComponent } from "./loan/loan.component";
import { UrlComponent } from "./url/url.component";
import { ApiSubmitDataComponent } from "./api-submit-data/api-submit-data.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "app-management",
        component: AppComponent
      },
      {
        path: "loan-supermarket",
        component: LoanComponent
      },
      {
        path: "url-setting",
        component: UrlComponent
      },
      {
        path: "api-submit-data",
        component: ApiSubmitDataComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
