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
  templateUrl: "./loan.component.html",
  styleUrls: ["./loan.component.less"]
})
export class LoanComponent implements OnInit {
  // 这里是modal内的输入表单
  validateForm: FormGroup;
  // 这里是筛选条件
  validateFormFilter: FormGroup;
  // select的选项
  loadListArr = [{ value: "全部", key: "" }];
  loadTypeListArr = [{ value: "全部", key: "" }];
  appListArr = [{ value: "全部", key: "" }];

  dataSet = [];
  // modal
  isVisible = false;
  isOkLoading = false;

  constructor(
    private requestService: RequestService,
    private fb: FormBuilder,
    private fbFilter: FormBuilder,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      loanMarketKey: [null, [Validators.required]],
      loanMarketType: [null, [Validators.required]],
      appCode: [null, [Validators.required]],
      loanMarketConfig: [null, [Validators.required]],
      orderMax: [null, [Validators.required]],
      channelCode: [null]
    });
    this.validateFormFilter = this.fbFilter.group({
      loanMarketKey: [""],
      appCode: [""]
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
    this.requestService.getLoanTypeSelect().subscribe(res => {
      if (!res.code && res.data) {
        this.loadTypeListArr = this.loadTypeListArr.concat(res.data) || [];
      }
    });
    this.requestService.getAppSelect().subscribe(res => {
      if (!res.code && res.data) {
        this.appListArr = this.appListArr.concat(res.data) || [];
      }
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    let self = this;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.isOkLoading = true;
      this.requestService.createLoan(this.validateForm.value).subscribe(res => {
        if (!res.code) {
          this.message.success("新增App成功！");
          this.isVisible = false;
          self.getList();
        } else {
          this.message.create("error", res.msg);
        }
        this.isOkLoading = false;
      });
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  // 关闭modal后的回调
  afterModalCloseHandle(): void {
    this.validateForm.reset();
  }
  // 筛选
  handleFilter($event): void {
    let controls = this.validateFormFilter.controls;
    for (const i in controls) {
      controls[i].markAsDirty();
      controls[i].updateValueAndValidity();
    }
    console.log(this.validateFormFilter.value);
    this.getList();
  }

  // 请求loan部分的list
  getList(): void {
    let self = this;
    let params = this.validateFormFilter.value;
    this.requestService.getLoanList(params).subscribe(res => {
      if (!res.code) {
        // 验证不通过就不会给提交
        self.dataSet = (res.data && res.data.listProductConfigVoList) || [];
      } else {
        self.message.create("error", res.msg);
      }
    });
  }
}
