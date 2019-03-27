import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PagesRoutingModule } from "./pages-routing.module";
import { LayoutComponent } from "./layout/layout.component";
import { LoanComponent } from "./loan/loan.component";
import { AppComponent } from "./app/app.component";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { UrlComponent } from "./url/url.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ApiSubmitDataComponent } from "./api-submit-data/api-submit-data.component";

@NgModule({
  declarations: [
    LayoutComponent,
    LoanComponent,
    AppComponent,
    UrlComponent,
    ApiSubmitDataComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    NgZorroAntdModule
  ]
})
export class PagesModule {}
