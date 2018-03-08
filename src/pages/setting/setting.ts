import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, App} from 'ionic-angular';
import {CommonProvider} from '../../providers/common/common'

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
  providers: [CommonProvider]
})
export class SettingPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public common: CommonProvider,
              public appCtrl: App) {}

  ionViewDidLoad() {
  }

  logout() {
    this.common.$comfirm('您是否要退出当前账户', this.out.bind(this))
  }

  // 退出绑定函数，需要绑定this对象
  out() {
    this.common.$http('DELETE', 'https://loclife.365gl.com/lifeAPI/logout')
      .subscribe(res => {
        localStorage.clear();
        this.appCtrl.getRootNav().push('TabsPage');
      })
  }

  linkPaymentSetting() {
    this.navCtrl.push('PaymentSettingPage');
  }

  linkSecurity() {
    this.navCtrl.push('SecurityPage');
  }
}
