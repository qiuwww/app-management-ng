import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";

// 网络请求的服务
import { RequestService } from "../../core";
import { NzMessageService } from "ng-zorro-antd";

@Component({
  selector: "app-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"]
})
export class AppComponent implements OnInit {
  validateForm: FormGroup;
  dataSet = [];

  // modal
  isVisible = false;
  isOkLoading = false;

  constructor(
    private requestService: RequestService,
    private fb: FormBuilder,
    private message: NzMessageService
  ) {}
  ngOnInit() {
    this.validateForm = this.fb.group({
      appCode: [null, [Validators.required]],
      appName: [null, [Validators.required]],
      appUrl: [null, [Validators.required]]
    });
    // 初始化的时候请求数据
    this.getList();
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    let self = this;
    // 验证规则
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.isOkLoading = true;
      this.requestService
        .createAppInfo(this.validateForm.value)
        .subscribe(res => {
          if (!res.code) {
            this.message.success("新增App成功！", { nzDuration: 10000 });
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

  // 请求app部分的list
  getList(): void {
    let self = this;
    this.requestService.getAppInfoList().subscribe(res => {
      if (!res.code && res.data) {
        // 验证不通过就不会给提交
        self.dataSet = res.data.appInfoVoList || [];
      } else {
        self.message.create("error", res.msg);
      }
    });
  }
  // modal中的表单
}
