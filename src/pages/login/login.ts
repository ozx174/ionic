import {Component, ElementRef} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, ViewController, App} from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {RegPhone} from '../../class/httpOption';
import 'rxjs/add/operator/filter';
import 'rxjs/Observable/of';
import {CommonProvider} from '../../providers/common/common';
import {App} from "ionic-angular";


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [CommonProvider]
})
export class LoginPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public elem: ElementRef,
              public alertCtrl: AlertController,
              public common: CommonProvider,
              private viewCtrl: ViewController,private appCtrl: App) {
  }

  btn: HTMLElement;
  name: string;
  password: string;
  private ERR_OK = '000000';

  // 返回方法
  back() {
    if (this.navParams['data']['logBackIn']){
      this.viewCtrl.dismiss();
      this.appCtrl.getRootNav().push('TabsPage');
    } else {
      this.navCtrl.pop();
    }
  }

  // alert方法
  presentAlert(text?: string) {
    let alert = this.alertCtrl.create({
      title: '温馨提示',
      subTitle: text,
      buttons: ['我知道了']
    });
    alert.present();
  }

  ionViewDidLoad() {
    this.btn = this.elem.nativeElement.querySelector('.login-btn');
    let a = Observable
      .fromEvent(this.btn, 'click')
      .throttleTime(2000)
      .mergeMap((res) => {
        if (!this.name) {
          return Observable.create(observer => {
            observer.next({'result': '999999', text: '请填写手机号码'})
          })
        } else if (!this.password) {
          return Observable.create(observer => {
            observer.next({'result': '999999', text: '请填写密码'})
          })
        } else if (!RegPhone.test(this.name)) {
          return Observable.create(observer => {
            observer.next({'result': '999999', text: '手机格式不正确'})
          })
        } else {
          return this.common.$loginHttp('POST', 'https://loclife.365gl.com/lifeAPI/login', {
            deviceName: "test",
            deviceVersion: "7.0.0",
            password: "983692abba1437188b734e566386ad6c",
            username: "15013756335",
          })
        }
      })
      .subscribe(
        res => {
          if (res['result'] === this.ERR_OK) {
            localStorage.setItem('token', res['data'].token);
            this.common.$http('GET', 'https://loclife.365gl.com/lifeAPI/user/info')
              .subscribe(data => {
                localStorage.setItem('baseInfo', JSON.stringify(data.data));
                a.unsubscribe();
                this.navCtrl.pop();
              })
          } else {
            this.presentAlert(res['text'])
          }
        },
        error => console.log(error),
        () => console.log('completed')
      )
  }
}
