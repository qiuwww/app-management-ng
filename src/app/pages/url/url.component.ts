import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { RequestService } from "../../core";
import { NzMessageService } from "ng-zorro-antd";
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: "app-url",
  templateUrl: "./url.component.html",
  styleUrls: ["./url.component.less"]
})
export class UrlComponent implements OnInit {
  // 这里是modal内的输入表单
  validateForm: FormGroup;
  // 这里是筛选条件
  validateFormFilter: FormGroup;
  loadListArr = [{ value: "全部", key: "" }];

  constructor(
    private requestService: RequestService,
    private fb: FormBuilder,
    private fbFilter: FormBuilder,
    private message: NzMessageService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      loanMarketKey: [null, [Validators.required]],
      keyUrl: [null, [Validators.required]],
      valueUrl: [null, [Validators.required]],
      adapterMethod: [null, [Validators.required]]
    });
    this.validateFormFilter = this.fbFilter.group({
      loanMarketKey: [""]
    });
    this.getSelectsOption();
    this.getList();
    // debugger
    // this.route.url.subscribe(data => {
    //   console.log(data);
    // });
  }
  // 获取页面内的select的选项
  getSelectsOption(): void {
    this.requestService.getLoanSelect().subscribe(res => {
      if (!res.code && res.data) {
        this.loadListArr = this.loadListArr.concat(res.data) || [];
      }
    });
  }
  dataSet = [];

  // modal
  isVisible = false;
  isOkLoading = false;

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
      this.requestService
        .createUrlMap(this.validateForm.value)
        .subscribe(res => {
          if (!res.code) {
            this.message.success("新增上架成功！");
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
  handleFilter(): void {
    let controls = this.validateFormFilter.controls;
    for (const i in controls) {
      controls[i].markAsDirty();
      controls[i].updateValueAndValidity();
    }
    this.getList();
  }

  // 请求url部分的list
  getList(): void {
    let self = this;
    let params = this.validateFormFilter.value;
    this.requestService.getUrlMapList(params).subscribe(res => {
      if (!res.code && res.data) {
        // 验证不通过就不会给提交
        self.dataSet = res.data.appInfoVoList || [];
      } else {
        self.message.create("error", res.msg);
      }
    });
  }
}
