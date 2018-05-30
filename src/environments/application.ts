export class Application {
  static baseContext = 'http://localhost:8081/jwt';

  // 授权登陆
  static login: string = Application.baseContext + '/login';
  static getAccountInfo: string =
    Application.baseContext + '/user/getAccountInfo';
}
