/**
 * Created by DELL on 2018/3/9.
 */

import {RequestProvider} from './request.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/observable';
import {ENV} from '../../env/env';

@Injectable()
export class MineServiceProvider {
  constructor(public req: RequestProvider) {
  }

  //获取银行卡
  getCards() {
    return this.req.$http('GET', `${ENV.backend}/lifeAPI/payment/fft/card/`, {
      'type': 0,
      'isNeedPos': true,
      "apiVersion": "V1.1.0"
    })
  }

  // 获取乐豆
  getCoin() {
    return this.req.$http('GET', `${ENV.backend}/lifeAPI/payment/user/happycoin/`, null)
  }

  //获取账单
  getBillInfo(data): Observable<any[]> {
    return this.req.$http('GET', `${ENV.backend}/lifeAPI/payment/bill`, data)
  }
}
