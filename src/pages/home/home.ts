import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {NavStore} from '../../class/nav-store';
import {HttpClient} from '@angular/common/http';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
  }

  ionViewDidLoad() {
    this.navs = [
      {text: '美食', id: 1},
      {text: '丽人', id: 1},
      {text: '休闲娱乐', id: 1},
      {text: '酒店住宿', id: 1},
      {text: '运动健身', id: 1},
      {text: '生活服务', id: 1},
      {text: '汽车服务', id: 1},
      {text: '旅游', id: 1}
    ]
  };

  navs: Array<NavStore>

  linkStoreList($event) {
    this.navCtrl.push('StoreListPage', {
      id: 1
    });
  }

  scanCode() {
    this.navCtrl.push('ScannerPage')
  }
}
