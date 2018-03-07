import {Component, OnInit, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Scroll, Content} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {CommonProvider} from '../../providers/common/common';
import 'rxjs/add/operator/map';

/**
 * Generated class for the StoreNearbyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-store-nearby',
  templateUrl: 'store-nearby.html',
  providers: [CommonProvider],
})
export class StoreNearbyPage implements OnInit {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private http: HttpClient,
              private common: CommonProvider) {
  }

  @ViewChild(Scroll) scroll: Scroll;
  @ViewChild(Content) content: Content;

  stores: Array<any>;
  url: string = 'http://api.map.baidu.com/geosearch/v3/nearby' +
    '?ak=HIF9z3sj78rvtXQVtKl3S1oQ9dU2ZgyD&geotable_id=170475&location=113.959062,22.543544' +
    '&sortby=distance:1&radius=50000&callback=myCallback&page_size=10&page_index=0';
  page: number = 0;  // 百度云分页从0开始

  ionViewDidLoad() {
    this.loadMore();
  }

  ngOnInit() {
    this.getIndustry();
  }

  mainNavNum: number = 101;  // 选择主菜单下标
  industryNum: number = 0; //选择行业分类下标
  industryList: Array<any>; // 行业列表
  holdIndustry: Array<any>; // 总行业列表
  industryMainTag: string = '美食'; // 行业总标签
  industryTag: string = '粤菜'; // 行业细分标签

  selectMainNav(num: number, $event, tagName: string) {  // num是主菜单传进来的下标
    $event.stopPropagation();
    this.mainNavNum = num;
    this.industryMainTag = tagName;
    let industry: Array<any>;
    this.holdIndustry.forEach(function (item) {
      if (item['id'] === num) {
        industry = item['sub']
      }
    });
    this.industryList = industry;
    if (num === 3 || num === 4) {
      this.industryTag = '';
    } else {
      this.industryTag = this.industryList[0]['name'];
    }
    this.page = 0;
    this.industryNum = 0; // 重置细分行业下标
    this.scroll._scrollContent.nativeElement.scrollLeft = 0; // 重置scroll组件位置。
    this.content.scrollTop = 0; // 重置content位置
    this.loadMore();
  }

  selectIndustry(num, $event, tagName) { // num是行业分类传进来的下标
    $event.stopPropagation();
    this.industryNum = num;
    this.industryTag = tagName;
    this.page = 0;
    this.content.scrollTop = 0; // 重置content位置
    this.loadMore();
  }

  loadMore(infiniteScroll?): void { // 上拉加载
    this.http
      .jsonp(this.url.substr(0, this.url.length - 1) + this.page + '&q=' + this.industryTag + '&tags=' + this.industryMainTag, 'callback')
      .subscribe(res => {
        if (this.page == 0) {
          this.stores = res['contents'];
        } else {
          this.stores = this.stores.concat(res['contents']);
        }
        this.page++;
        if (infiniteScroll) infiniteScroll.complete();
      })
  }

  doRefresh(event): void {  // 下拉刷新
    this.page = 0;
    this.http
      .jsonp(this.url.substr(0, this.url.length - 1) + this.page + '&q=' + this.industryTag + '&tags=' + this.industryMainTag, 'callback')
      .subscribe(res => {
        this.stores = res['contents'];
        this.page = 1;
        event.complete();
      }, err => {
        event.complete();
      })
  }

  getIndustry() {  // 获取行业信息
    this.common.$http('get', 'https://loclife.365gl.com/lifeAPI/industry')
      .map(res => {
        let industry: Array<any>;
        let num = this.mainNavNum;
        this.holdIndustry = res['data']['sub'];
        res['data']['sub'].forEach(function (item) {
          if (item['id'] === num) {
            industry = item['sub']
          }
        });
        return industry
      })
      .subscribe(res => {
        this.industryList = res; // 进来默认第一个列表
        this.industryTag = this.industryList[0].name;
      })
  }

  linkStore(store) {  // 跳转商店详情
    this.navCtrl.push('StorePage', {id: store.merchantNo});
  }
}
