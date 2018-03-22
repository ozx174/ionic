/**
 * Created by DELL on 2018/3/22.
 */

import {RequestProvider} from './request.service';
import {Injectable} from '@angular/core';
import {ENV} from '../../env/env';

@Injectable()
export class LoginServiceProvider {
  constructor(public req: RequestProvider) {
  }

  // 登录
  login(params) {
    return this.req.$loginHttp('POST', `${ENV.backend}/lifeAPI/login`, params)
  }

  // 获取个人信息
  getUserInfo() {
    return this.req.$http('GET', `${ENV.backend}/lifeAPI/user/info`)
  }

}
