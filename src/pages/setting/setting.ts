import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Navbar, App, ViewController} from 'ionic-angular';
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
  @ViewChild(Navbar) navs: Navbar;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public common: CommonProvider,
              public viewCtrl: ViewController,
              public appCtrl: App) {}

  ionViewDidLoad() {
    this.navs.setBackButtonText('返回')
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
