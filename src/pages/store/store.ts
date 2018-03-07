import {Component, ViewChild, Renderer2} from '@angular/core';
import {IonicPage, NavController, NavParams, Content, ModalController} from 'ionic-angular';
import {CommonProvider} from "../../providers/common/common";
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/observable/forkJoin';

/**
 * Generated class for the StorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
const ERR_OK = '000000';
@IonicPage()
@Component({
  selector: 'page-store',
  templateUrl: 'store.html',
  providers: [CommonProvider]
})
export class StorePage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private render: Renderer2,
              private common: CommonProvider,
              public http: HttpClient,
              private modal: ModalController) {
  }

  @ViewChild(Content) content: Content;
  @ViewChild('storeHeader') storeHeader: HTMLElement;
  ERR_OK = '000000';

  ionViewWillEnter() {
    let OB1 = this.common.$http('get', `https://loclife.365gl.com/lifeAPI/merchant/detail/${this.navParams.get('id')}`);
    let OB2 = this.common.$http('POST', 'https://loclife.365gl.com/lifeAPI/merchant/comments', {
      merchantNo: this.navParams.get('id'),
      curPage: this.curPage,
      pageSize: 5
    }, true);
    let url = `http://api.map.baidu.com/geosearch/v3/nearby?ak=HIF9z3sj78rvtXQVtKl3S1oQ9dU2ZgyD&geotable_id=170475&location=113.959062,22.543544&radius=100000000&sortby=distance:1&callback=myCallback&filter=merchantNo:[${this.navParams.get('id')}]`;
    let OB3 = this.http.jsonp(url, 'callback');
    Observable.forkJoin([OB1, OB2, OB3])
      .subscribe(res => {
        let res1 = res[0];
        let res2 = res[1];
        let res3 = res[2];
        if (res1['result'] === ERR_OK) {
          this.banners = res1['data']['images'];
          this.name = res1['data']['name'];
          this.commentGrade = res1['data']['commentGrade'];
          this.paymentCount = res1['data']['paymentCount'];
          this.saleRate = res1['data']['saleRate'];
          this.longitude = res1['data']['longitude'];
          this.latitude = res1['data']['latitude'];
        } else {
          this.common.$alert('网络好像不太给力呢····')
        }
        if (res2['result'] === this.ERR_OK) {
          this.curPage++;
          this.commentLists = res2['data']['list'];
        } else {
          this.common.$alert('网络好像不太给力呢····')
        }
        this.address = res3['contents'][0]['address'];
        this.tel = res3['contents'][0]['modify_time'];
      })
  }

  slideIndex: number = 0; // 轮播下标
  banners: Array<string>; // 轮播数组
  name: string; // 商店信息
  commentGrade: number; // 综合评分
  paymentCount: number; // 消费人数
  saleRate: number; // 返豆率
  curPage: number = 1; // 评论列表分页
  commentLists: Array<object>; // 评论列表
  address: string; // 商店地址
  tel: number; // 商家电话
  longitude: number; // 地图经度
  latitude: number; // 地图维度

  back() { // 返回方法
    this.navCtrl.pop();
  }

  getSlideIndex($event) { // 获取当前轮播图下标
    this.slideIndex = $event.realIndex;
  }

  changTitle($event) { // title颜色渐变方法
    let opacity = $event['scrollTop'] / 100 > 1 ? 1 : $event['scrollTop'] / 100;
    this.render.setStyle(this.storeHeader['nativeElement'], 'background-color', `rgba(56,171,237,${opacity})`)
  }

  loadMore($event?) { // 加载更多评论
    this.common.$http('POST', 'https://loclife.365gl.com/lifeAPI/merchant/comments', {
      merchantNo: this.navParams.get('id'),
      curPage: this.curPage,
      pageSize: 5
    }).subscribe(res => {
      if (res['result'] === this.ERR_OK) {
        this.curPage++;
        this.commentLists = this.commentLists.concat(res['data']['list']);
        $event.complete();
      } else {
        this.common.$alert('网络好像不太给力呢····')
      }
    })
  }

  daCall() { // 打电话
    this.common.$telActionSheet(this.tel)
  }

  bmap() {  // 跳转百度地图
    let modal = this.modal.create('BmapPage', {name: this.name,address:this.address,longitude: this.longitude, latitude: this.latitude});
    modal.present();
  }
}
