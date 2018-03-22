import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import {LoadingController} from 'ionic-angular';

@Injectable()
export class RequestProvider {
  constructor(public http: HttpClient,
              public loadingCtrl: LoadingController) {
  }

  deviceId: string = 'test';
  clientId: string = 'test';
  clientVersion: string = '6.2.0';
  time: number;
  token: string;
  ERR_OK: string = '000000';
  ERR_LOGIN: string = '000001'; // Unused field

  $http(method: string, url: string, reqData?: Object, loading?: boolean): Observable<any> {
    this.time = Math.floor(new Date().getTime() / 1000);
    this.token = localStorage.getItem('token') || '';

    let signUrl: string = 'https://loclife.365gl.com/lifeAPI/getSign?text=' + this.token + this.deviceId + this.clientId
      + this.clientVersion + this.time;

    return this.http.get(signUrl)
      .mergeMap(sign => {
        let Options = {
          headers: {
            GL_CLIENT_ID: "test",
            GL_CLIENT_VER: "6.2.0",
            GL_DEVICE_ID: "test",
            GL_REQ_SIGN: sign['data'],
            GL_TIMESTAMP: this.time.toString(),
            GL_TOKEN: this.token,
          }
        };
        if (method.toLocaleLowerCase() === 'post' || method.toLocaleLowerCase() === 'put') {
          Options['body'] = reqData;
        } else {
          Options['params'] = reqData;
        }
        if (loading) {
          this.$loading();
        }
        return this.http.request(method.toLocaleUpperCase(), url, Options)
      })
  }

  $loginHttp(method: string, url: string, reqData?: Object): Observable<any> {
    this.time = Math.floor(new Date().getTime() / 1000);
    this.token = localStorage.getItem('token') || '';

    let signUrl: string = 'https://loclife.365gl.com/lifeAPI/getSign?text=' + this.token + this.deviceId
      + this.clientId + this.clientVersion + this.time + reqData['username'] + reqData['password'];

    return this.http.get(signUrl)
      .mergeMap(sign => {
        let Options = {
          headers: {
            GL_CLIENT_ID: "test",
            GL_CLIENT_VER: "6.2.0",
            GL_DEVICE_ID: "test",
            GL_REQ_SIGN: sign['data'],
            GL_TIMESTAMP: this.time.toString(),
          }
        };
        if (method.toLocaleLowerCase() === 'post') {
          Options['body'] = reqData;
        } else {
          Options['params'] = reqData;
        }
        return this.http.request(method, url, Options)
      })
  }

  $loading() {
    let loading = this.loadingCtrl.create({
      content: '没看见加载吗？你急个啥',
      duration: 800
    });
    loading.present();
  }
}
