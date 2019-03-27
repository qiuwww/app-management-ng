import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { RequestService } from "../../core";
import { NzMessageService } from "ng-zorro-antd";
@Component({
  selector: "app-loan",
  templateUrl: "./api-submit-data.component.html",
  styleUrls: ["./api-submit-data.component.less"]
})
export class ApiSubmitDataComponent implements OnInit {
  // 这里是modal内的输入表单
  validateForm: FormGroup;
  // 这里是筛选条件
  validateFormFilter: FormGroup;
  // select的选项
  loadListArr = [{ value: "全部", key: "" }];
  appListArr = [{ value: "全部", key: "" }];
  // 当前展示的数据
  displayData: Array<any> = [];
  dataSet = [];
  showLoading = false;
  constructor(
    private requestService: RequestService,
    private fbFilter: FormBuilder,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.validateFormFilter = this.fbFilter.group({
      loanMarketKey: [""],
      appCode: [""],
      dateRange: [[new Date(), new Date()]]
    });
    this.getSelectsOption();
    this.getList();
  }

  // 获取页面内的select的选项
  getSelectsOption(): void {
    this.requestService.getLoanSelect().subscribe(res => {
      if (!res.code && res.data) {
        this.loadListArr = this.loadListArr.concat(res.data) || [];
      }
    });
    this.requestService.getAppSelect().subscribe(res => {
      if (!res.code && res.data) {
        this.appListArr = this.appListArr.concat(res.data) || [];
      }
    });
  }

  // 筛选
  handleFilter(): void {
    let controls = this.validateFormFilter.controls;
    for (const i in controls) {
      controls[i].markAsDirty();
      controls[i].updateValueAndValidity();
    }
    console.log(this.validateFormFilter.value);
    this.getList();
  }
  formatData(date: Date) {
    const yyyy = date.getFullYear();
    const MM = date.getMonth() + 1;
    const dd = date.getDate();
    return new Date(`${yyyy}-${MM}-${dd}`).getTime();
  }
  // 请求loan部分的list
  getList(): void {
    let self = this;
    let value = this.validateFormFilter.value;
    const date = value.dateRange || [];
    const params = {
      appCode: value.appCode,
      startDate: date[0] ? this.formatData(date[0]) : null,
      loanMarketKey: value.loanMarketKey,
      endDate: date[1] ? this.formatData(date[1]) : null
    };
    this.requestService.orderInfoList(params).subscribe(res => {
      if (!res.code) {
        // 验证不通过就不会给提交
        self.dataSet = (res.data && res.data.vo) || [];
      } else {
        self.message.create("error", res.msg);
      }
    });
  }
  // table的分页操作
  refreshStatus() {}
}
