import {Component, ViewChild, ElementRef} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides, Content} from 'ionic-angular';
import {CommonProvider} from '../../providers/common/common';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import {Subject} from "rxjs/Subject";
import 'rxjs/add/operator/map';

/**
 * Generated class for the MinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html',
  providers: [CommonProvider]
})
export class MinePage {
  @ViewChild(Slides) slides: Slides;
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private common: CommonProvider,
              private el: ElementRef) {
  }

  private ERR_OK = '000000';

  ionViewWillEnter() {
    // 获取个人基本信息
    this.baseInfo = JSON.parse(localStorage.getItem('baseInfo'));

    // 取乐豆余额
    if (localStorage.getItem('token')) {
      this.common.$http('GET', 'https://loclife.365gl.com/lifeAPI/payment/user/happycoin/', null)
        .subscribe(res => {
          if (res['result'] === this.ERR_OK) {
            this.bean = res['data']['amount']
          } else if (res['result'] === '000001') {
            this.common.$alert(res['description'], null, null, function () {
              localStorage.clear()
            })
          } else {
            this.common.$alert(res['description'])
          }
        });
    }
  }

  ionViewDidLoad() {
    // 获取银行卡
    this.common.$http('GET', 'https://loclife.365gl.com/lifeAPI/payment/fft/card/', {
      'type': 0,
      'isNeedPos': true,
      "apiVersion": "V1.1.0"
    }).subscribe(res => {
      if (res['result'] === this.ERR_OK) {
        this.bankList = res['data'];
      } else if (res['result'] === '000001') {
        this.common.$alert(res['description'], null, null, function () {
          localStorage.clear()
        })
      } else {
        this.common.$alert(res['description']);
      }
    });

    let pre_t: number = 0;
    let t: number = 0;
    let _content = this.content;
    this.el.nativeElement.addEventListener('touchstart', function ($event) {
      pre_t = $event.touches[0].screenY;
    });

    this.el.nativeElement.addEventListener('touchmove', function ($event) {
      t = $event.touches[0].screenY;
    });

    this.el.nativeElement.addEventListener('touchend', ABC.bind(this));

    function ABC() {
      if (t - pre_t > 0) {
        if (this.content.scrollTop < 10) {
          this.topMode = false;
          setTimeout(function () {
            _content.resize();
          }, 320)
        }
      } else {
        if (!this.topMode) {
          if (this.content.scrollTop > 10) {
            this.topMode = true;
            setTimeout(function () {
              _content.resize();
            }, 320)
          }
        }
      }
    }
  }


  private bean: string;  // 乐豆数量
  private baseInfo: Object = {};  // 个人基础信息
  private bankList: Array<any> = [];  // 银行卡列表
  topMode: boolean = false; // 上拉浏览模式

  private lists: Array<any> = [null, null, null, null, null, null];  // 账单各月份总列表
  private noMoreMonth: Array<boolean> = [false, false, false, false, false, false]; // 各月是否还能加载更多
  private monthIndex = { // slideIndex 和 后台月份index的映射表；
    5: 0,
    4: 1,
    3: 2,
    2: 3,
    1: 4,
    0: 5
  };
  private monthPage: number[] = [1, 1, 1, 1, 1, 1]; // 每个月份请求页数
  private slideIndex: number = 5; // slider下标；

  public linkStore() {  //  跳转商店列表页
    this.navCtrl.push('StoreListPage');
  }


  // 滑动账单观察对象
  private slide$ = new Subject();

  // 滑动切换月份触发方法
  public slideChanged() {
    if (this.slides.getActiveIndex() > 5 || this.slides.getActiveIndex() < 0) {
      return;
    }
    this.slideIndex = this.slides.getActiveIndex();
    if (!this.lists[this.slideIndex]) {
      this.slide$.next();
    }
  }

  // 订阅滑动事件
  billData = this.slide$
    .switchMap(() => this.getBillInfo(this.monthIndex[this.slideIndex], this.slideIndex))
    .catch(error => {
      // TODO: add real error handling
      console.log(error);
      return Observable.of([]);
    })
    .subscribe(res => {
      if (res['result'] === this.ERR_OK) {
        this.lists[this.slideIndex] = res['data'];
        if (res['data']['list'].length < 10) {
          this.noMoreMonth[this.slideIndex] = true;
        }
        this.monthPage[this.slideIndex]++;
      } else if (res['result'] === '000001') {
        this.common.$alert(res['description'], null, null, function () {
          localStorage.clear()
        })
      } else {
        this.common.$alert(res['description'])
      }
    });

  // 上拉加载更多
  loadMore($event) {
    if (this.noMoreMonth[this.slideIndex]) {
      $event.complete();
    } else {
      this.getBillInfo(this.monthIndex[this.slideIndex], this.slideIndex)
        .subscribe(res => {
          this.lists[this.slideIndex]['list'] = this.lists[this.slideIndex]['list'].concat(res['data']['list']);
          if (res['data']['list'].length < 10) {
            this.noMoreMonth[this.slideIndex] = true;
          }
          this.monthPage[this.slideIndex]++;
          $event.complete();
        })
    }
  }

  // 取账单方法
  private getBillInfo(monthIndex, index): Observable<any[]> {
    return this.common.$http('GET', 'https://loclife.365gl.com/lifeAPI/payment/bill', {
      month: monthIndex,
      curPage: this.monthPage[index],
      pageSize: 10
    })
  }

  // 跳转账单详情
  linkBillDetais(bill) {
    this.navCtrl.push('BillDetailsPage', {
      bill: bill
    });
  }

  // 跳转设置页面
  linkSetting() {
    this.navCtrl.push('SettingPage');
  }
}
