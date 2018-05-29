import {
  SettingsService,
  _HttpClient,
  TitleService,
  MenuService,
} from '@delon/theme';
import { Component, OnDestroy, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import {
  SocialService,
  SocialOpenType,
  TokenService,
  DA_SERVICE_TOKEN,
} from '@delon/auth';
import { ReuseTabService } from '@delon/abc';
import { environment } from '@env/environment';
import { StartupService } from '@core/startup/startup.service';
import { Application } from '@env/application';
import { GoldbalConstant } from '@env/global.constant';
import { AccountCredentialsInfo } from 'app/routes/passport/login/model/AccountCredentialsInfo';
import { AppResponse } from '@core/model/AppResponse';
import { ACLService } from '@delon/acl';

@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [SocialService],
})
export class UserLoginComponent implements OnDestroy {
  form: FormGroup;
  error = '';
  type = 0;
  loading = false;

  constructor(
    fb: FormBuilder,
    private router: Router,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private settingsService: SettingsService,
    private socialService: SocialService,
    private aclService: ACLService,
    private titleService: TitleService,
    private menuService: MenuService,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService,
    private startupSrv: StartupService,
    private http: _HttpClient,
  ) {
    this.form = fb.group({
      userName: [null, [Validators.required, Validators.minLength(5)]],
      password: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
      captcha: [null, [Validators.required]],
      remember: [true],
    });
    modalSrv.closeAll();
  }

  // region: fields

  get userName() {
    return this.form.controls.userName;
  }
  get password() {
    return this.form.controls.password;
  }
  get mobile() {
    return this.form.controls.mobile;
  }
  get captcha() {
    return this.form.controls.captcha;
  }

  // endregion

  switch(ret: any) {
    this.type = ret.index;
  }

  // region: get captcha

  count = 0;
  interval$: any;

  getCaptcha() {
    this.count = 59;
    this.interval$ = setInterval(() => {
      this.count -= 1;
      if (this.count <= 0) clearInterval(this.interval$);
    }, 1000);
  }

  // endregion

  submit() {
    this.error = '';
    if (this.type === 0) {
      this.userName.markAsDirty();
      this.userName.updateValueAndValidity();
      this.password.markAsDirty();
      this.password.updateValueAndValidity();
      if (this.userName.invalid || this.password.invalid) return;
    } else {
      this.mobile.markAsDirty();
      this.mobile.updateValueAndValidity();
      this.captcha.markAsDirty();
      this.captcha.updateValueAndValidity();
      if (this.mobile.invalid || this.captcha.invalid) return;
    }
    // mock http
    this.loading = true;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    this.http
      .post<AppResponse<AccountCredentialsInfo>>(
        Application.login,
        { username: this.userName.value, password: this.password.value },
        { headers: headers },
      )
      .subscribe(resp => {
        if (GoldbalConstant.STATUS_CODE.SUCCESS === resp.code) {
          const accountCredentialsInfo = resp.result;

          // 清空路由复用信息
          this.reuseTabService.clear();

          // 设置Token信息
          this.tokenService.set({
            token: accountCredentialsInfo.token,
            name: accountCredentialsInfo.user.name,
            email: accountCredentialsInfo.user.email,
            id: accountCredentialsInfo.user.id,
            time: +new Date(),
          });

          // 应用信息：包括站点名、描述、年份
          this.settingsService.setApp(accountCredentialsInfo.app);
          // 用户信息：包括姓名、头像、邮箱地址
          this.settingsService.setUser(accountCredentialsInfo.user);
          // ACL：设置权限为全量
          this.aclService.setFull(true);
          // 初始化菜单
          this.menuService.add(accountCredentialsInfo.menu);
          // 设置页面标题的后缀
          this.titleService.suffix = accountCredentialsInfo.app.name;

          // 重新获取 StartupService 内容，若其包括 User 有关的信息的话
          // this.startupSrv.load().then(() => this.router.navigate(['/']));
          // 否则直接跳转
          this.router.navigate(['/']);
        } else {
          this.error = `账户或密码错误`;
        }
      });
  }

  // region: social

  open(type: string, openType: SocialOpenType = 'href') {
    let url = ``;
    let callback = ``;
    if (environment.production)
      callback = 'https://cipchk.github.io/ng-alain/callback/' + type;
    else callback = 'http://localhost:4200/callback/' + type;
    switch (type) {
      case 'auth0':
        url = `//cipchk.auth0.com/login?client=8gcNydIDzGBYxzqV0Vm1CX_RXH-wsWo5&redirect_uri=${decodeURIComponent(
          callback,
        )}`;
        break;
      case 'github':
        url = `//github.com/login/oauth/authorize?client_id=9d6baae4b04a23fcafa2&response_type=code&redirect_uri=${decodeURIComponent(
          callback,
        )}`;
        break;
      case 'weibo':
        url = `https://api.weibo.com/oauth2/authorize?client_id=1239507802&response_type=code&redirect_uri=${decodeURIComponent(
          callback,
        )}`;
        break;
    }
    if (openType === 'window') {
      this.socialService
        .login(url, '/', {
          type: 'window',
        })
        .subscribe(res => {
          if (res) {
            this.settingsService.setUser(res);
            this.router.navigateByUrl('/');
          }
        });
    } else {
      this.socialService.login(url, '/', {
        type: 'href',
      });
    }
  }

  // endregion

  ngOnDestroy(): void {
    if (this.interval$) clearInterval(this.interval$);
  }
}
