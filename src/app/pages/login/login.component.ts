// 测试环境的账户密码 18157170715/123456
import { Component, OnInit } from "@angular/core";
import { JwtService } from "../../core/services/jwt.service";
// FormBuilder 提供了一个语法糖，以简化 FormControl、FormGroup 或 FormArray 实例的创建过程。 它会减少构建复杂表单时所需的样板代码的数量。
// 网络请求的服务
import { RequestService } from "../../core";
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.less"]
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;

  constructor(
    private jwtService: JwtService,
    private fb: FormBuilder,
    private requestService: RequestService,
    private message: NzMessageService,
    public router: Router,
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      phoneNumber: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  // 提交
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
      // console.log(this.validateForm.controls[i].value);
    }
    if (this.validateForm.valid){
      this.loginHandle();
    }
  }
  // 登陆的接口请求
  loginHandle(): void {
    let self = this;
    let values = this.validateForm.value;
    let params = {
      account: values.phoneNumber,
      password: values.password,
    }
    this.requestService.login(params).subscribe(res => {
      if (!res.code && res.data) {
        this.jwtService.saveToken(res.data);
        setTimeout(() => {
          self.router.navigate(['/pages/app-management']);
        }, 300);
        // 验证不通过就不会给提交
      } else {
        self.message.create('error', res.msg);
      }
    });
  }
}
