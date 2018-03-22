import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/mergeMap';
import {AlertController, LoadingController, ActionSheetController, ModalController} from 'ionic-angular';

/*
 Generated class for the CommonProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class CommonProvider {
  constructor(public http: HttpClient,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public actionSheetCtrl: ActionSheetController,
              public modalCtrl: ModalController) {
  }
  $alert(text: string, title?: string, btn?: string, callback?) {
    let alert = this.alertCtrl.create({
      title: title || '温馨提示',
      subTitle: text,
      buttons: [{
        text: '我知道了' || btn, handler: data => {
          if (callback) callback();
        }
      }]
    });
    alert.present();
  }

  $comfirm(text: string, confirmCallback?, title?: string, cancelBtn?: string, confirmBtn?: string, cancelCallback?) {
    let comfirm = this.alertCtrl.create({
      title: title || '温馨提示',
      subTitle: text,
      buttons: [{
        text: '取消' || cancelBtn, handler: data => {
          if (cancelCallback) cancelCallback();
        }
      }, {
        text: '确定' || confirmBtn, handler: data => {
          if (confirmCallback) confirmCallback();
        }
      }]
    });
    comfirm.present();
  }

  $telActionSheet(tel) {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: tel,
          handler: () => {
            this.$alert(`给${tel}打电话`)
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
          }
        },
      ]
    });
    actionSheet.present();
  }

  logBackIn(Page?, func?) {
    let modal = this.modalCtrl.create('LoginPage',{logBackIn: true});
    modal.onDidDismiss(() => {
      Page && Page[func]();
    });
    modal.present()
  }
}
