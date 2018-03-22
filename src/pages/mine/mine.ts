import {Component, ViewChild, ElementRef} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides, Content, ModalController} from 'ionic-angular';
import {CommonProvider} from '../../providers/common/common';
import {MineServiceProvider} from '../../providers/services/mine.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/switchMap';
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
  providers: [CommonProvider, MineServiceProvider]
})
export class MinePage {
  @ViewChild(Slides) slides: Slides;
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private common: CommonProvider,
              private el: ElementRef,
              private mineServiceProvider: MineServiceProvider, private modalCtrl: ModalController) {
  }

  private ERR_OK = '000000';
  private ERR_LOGIN = '000001';
  private bean: string = '0';  // 乐豆数量
  private baseInfo: Object = {};  // 个人基础信息
  private bankList: Array<any> = [];  // 银行卡列表
  topMode: boolean = false; // 上拉浏览模式
  private lists: Array<any> = [null, null, null, null, null, null];  // 账单各月份总列表
  private noMoreMonth: Array<boolean> = [false, false, false, false, false, false]; // 各月是否还能加载更多
  private slideIndex: number = 5; // slider下标；
  private monthIndex = { // slideIndex 和 后台月份index的映射表；
    5: 0,
    4: 1,
    3: 2,
    2: 3,
    1: 4,
    0: 5
  };
  private monthPage: number[] = [1, 1, 1, 1, 1, 1]; // 每个月份请求页数

  ionViewDidEnter() {
    // 获取个人基本信息
    this.init();
  }

  ionViewDidLoad() {
    let pre_t: number = 0;
    let t: number = 0;
    let _content = this.content;
    this.el.nativeElement.addEventListener('touchstart', function ($event) {
      pre_t = $event.touches[0].screenY;
    });

    this.el.nativeElement.addEventListener('touchmove', function ($event) {
      t = $event.touches[0].screenY;
    });

    this.el.nativeElement.addEventListener('touchend', _animate.bind(this));

    function _animate() {
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

  public linkStore() {  //  跳转商店列表页
    this.navCtrl.push('StoreListPage');
  }

  // 滑动切换月份触发方法
  public slideChanged() {
    if (this.slides.getActiveIndex() > 5 || this.slides.getActiveIndex() < 0) {
      return;
    }
    this.slideIndex = this.slides.getActiveIndex();
    if (this.slideIndex === 5) {
      return;
    } else if (!this.lists[this.slideIndex]) {
      this.getBillInfo(this.monthIndex[this.slideIndex], this.slideIndex)
        .subscribe(res => {
          if (res['result'] === this.ERR_OK) {
            this.lists[this.slideIndex] = res['data'];
            if (res['data']['list'].length < 10) {
              this.noMoreMonth[this.slideIndex] = true;
            }
            this.monthPage[this.slideIndex]++;
          } else if (res['result'] === '000001') {
            this.common.$alert(res['description'], null, null, function () {
              localStorage.clear();
              this.slides.slideTo(5);
              this.noMoreMonth = [false,false,false,false,false,false];
              this.lists = [null,null,null,null,null,null];
              this.common.logBackIn(this, 'init');
            }.bind(this))
          } else {
            this.common.$alert(res['description'])
          }
        });
    }
  }

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
    return this.mineServiceProvider.getBillInfo({
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

  // 获取乐豆方法
  getCoin() {
    return this.mineServiceProvider.getCoin();
  }

  // 获取银行卡
  getCards() {
    return this.mineServiceProvider.getCards();
  }

  // 跳转设置页面
  linkSetting() {
    this.navCtrl.push('SettingPage');
  }

  // 初始化数据
  init() {
    this.baseInfo = JSON.parse(localStorage.getItem('baseInfo')) || {};
    if (!localStorage.getItem('token')) {
      return;
    }
    Observable.forkJoin(this.getBillInfo(this.monthIndex[5], 5), this.getCards(), this.getCoin())
      .subscribe(res => {
        for (let i = 0; i < res.length; i++) {
          if (res[i].result === this.ERR_LOGIN) {
            this.common.$alert(res[i]['description'], null, null, function () {
              localStorage.clear();
              this.slideIndex = 5;
              this.noMoreMonth = [false,false,false,false,false,false];
              this.lists = [null,null,null,null,null,null];
              this.common.logBackIn(this, 'init');
            }.bind(this));
            return
          }
        }
        if (res[0]['result'] === this.ERR_OK) {
          this.lists[5] = res[0]['data'];
          if (res[0]['data']['list'].length < 10) {
            this.noMoreMonth[5] = true;
          }
          this.monthPage[5]++;
        } else {
          this.common.$alert(res[0]['description']);
        }
        if (res[1]['result'] === this.ERR_OK) {
          this.bankList = res[1]['data'];
        }
        if (res[2]['result'] === this.ERR_OK) {
          this.bean = res[2]['data']['amount'];
        }
      });
  }
}
