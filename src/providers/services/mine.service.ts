/**
 * Created by DELL on 2018/3/9.
 */

import {CommonProvider} from '../common/common';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/observable';

@Injectable()
export class MineServiceProvider {
  constructor(public common: CommonProvider) {
  }

  //获取银行卡
  getCards() {
    return this.common.$http('GET', '/lifeAPI/payment/fft/card/', {
      'type': 0,
      'isNeedPos': true,
      "apiVersion": "V1.1.0"
    })
  }

  // 获取乐豆
  getCoin() {
    return this.common.$http('GET', '/lifeAPI/payment/user/happycoin/', null)
  }

  //获取账单
  getBillInfo(data): Observable<any[]> {
    return this.common.$http('GET', '/lifeAPI/payment/bill', data)
  }
}
