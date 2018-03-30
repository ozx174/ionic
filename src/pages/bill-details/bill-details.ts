import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Navbar} from 'ionic-angular';
import {RequestProvider} from '../../providers/services/request.service';
import {Bill} from '../../class/bill';

/**
 * Generated class for the BillDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bill-details',
  templateUrl: 'bill-details.html',
  providers: [RequestProvider]
})
export class BillDetailsPage {
  @ViewChild(Navbar) navs: Navbar;

  constructor(public navCtrl: NavController, public navParams: NavParams, public req: RequestProvider) {
  }

  ionViewDidLoad() {
    this.navs.setBackButtonText('返回');
    this.bill = this.navParams.data.bill;
    this._getStoreInfo();
  }

  bill: Bill;
  storeInfo: any;

  _getStoreInfo() {
    this.req.$http('get',`https://loclife.365gl.com/lifeAPI/merchant/detail/${this.bill.merchantNo}`)
      .subscribe(res => {
        this.storeInfo = res['data'];
      })
  }
}
