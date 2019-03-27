# AppManagementNg

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## NOTE

### 重制表单

```js
this.validateForm.reset();
```

### ???拦截器，HttpInterceptor

[参考文档1](https://segmentfault.com/a/1190000016788970?utm_source=tag-newest)
[参考文档2](https://www.jianshu.com/p/589e3c67e248)

拦截器在Angular项目中其实有着十分重要的地位，拦截器可以统一对 HTTP 请求进行拦截处理，我们可以在每个请求体或者响应后对应的流添加一系列动作或者处理数据，再返回给使用者调用。

每个 API 调用的时候都不可避免的会出现**网络超时**的情况，但是这种情况是多变的，可能是网络问题，也有可能是服务端问题，尽管如此，我们也只需对网络超时这一种情况来进行处理。

### 修改history为hash模式的路由

``` js
// 设置路由使用hash跳转
{ provide: LocationStrategy, useClass: HashLocationStrategy }
```

### 获取当前的路由状态

这里需要在具体的页面内来获取当前页面的url。

路由器会构建出一个 ActivatedRoute组成的树，它表示路由器的当前状态。 你可以在应用中的任何地方用 Router服务及其 routerState 属性来访问当前的 RouterState 值。

``` js
export class CompanyComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
  // Get Parent Path:  about 获取父级path值
  /*[UrlSegment]
    0: UrlSegment
    parameterMap: (...)
    parameters: {}
    path: "xxxx"
    __proto__: Object
    length: 1
  __proto__: Array(0)
  */
    this.route.parent.url.subscribe(url => console.log(url[0].path));
    // Get Current Path:  company  同理
    this.route.url.subscribe(url => console.log(url[0].path));
    // Route Data:  { title: 'Company' }
    this.route.data.subscribe(data => console.log(data));
  }
}
```

params: 对应路径参数

备注：这里后期需要添加选择页面，然后把当前页面的title改掉，需要用到自组件来调用父组件的方法，把当前的路由给到layout组件，然后主动控制显示。
这里有router-outlink的方法onActivate，似乎可以直接拿到当前要跳转的url。

## 项目发布相关

oss地址：oss://babel/H5/flow-gateway/test/

[测试环境访问地址：](http://yhoss.yangcongjietiao.com/H5/flow-gateway/test/index.html)
[正式环境访问地址：](https://yhoss.yangcongjietiao.com/H5/flow-gateway/pro/index.html)

## 遇到的问题

### 发布到线上环境的时候index.html文件名会被隐藏

需要配置为如下：

```js
<base href="">
```

在scripts下配置打包的base地址： `"build": "ng build --prod --base-href ''",`

## 账户等相关问题

### 测试环境账户密码

admin 123456
