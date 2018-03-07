import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Navbar} from 'ionic-angular';
import {CommonProvider} from '../../providers/common/common';

/**
 * Generated class for the PaymentSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment-setting',
  templateUrl: 'payment-setting.html',
  providers: [CommonProvider]
})
export class PaymentSettingPage {
  @ViewChild(Navbar) navBar: Navbar;

  constructor(public navCtrl: NavController, public navParams: NavParams, public common: CommonProvider) {
  }

  ionViewDidLoad() {
    this.navBar.setBackButtonText('返回');
    this.pepperoni = JSON.parse(localStorage.getItem('baseInfo'))['enableHappyCoin'];
  }

  private pepperoni: boolean;

  public switchAccount($event) {
    let postData = {};
    if ($event === false) {
      postData['value'] = 0;
    } else {
      postData['value'] = 1;
    }
    this.common.$http('PUT','https://loclife.365gl.com/lifeAPI/user/enableHappyCoin', postData)
      .subscribe(() => {
        let baseInfo = JSON.parse(localStorage.getItem('baseInfo'));
        if (postData['value'] === 0) {
          baseInfo['enableHappyCoin'] = false;
        } else {
          baseInfo['enableHappyCoin'] = true;
        }
        localStorage.setItem('baseInfo', JSON.stringify(baseInfo));
      })
  }
}
