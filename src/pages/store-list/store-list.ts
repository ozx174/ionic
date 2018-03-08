import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';

/**
 * Generated class for the StoreListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-store-list',
  templateUrl: 'store-list.html',
})
export class StoreListPage implements OnInit {

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
  }

  ionViewDidLoad() {
  }

  stores: Array<any>;
  url: string = 'http://api.map.baidu.com/geosearch/v3/nearby' +
    '?ak=HIF9z3sj78rvtXQVtKl3S1oQ9dU2ZgyD&geotable_id=170475&location=113.959062,22.543544' +
    '&tags=%E7%BE%8E%E9%A3%9F&sortby=distance:1&radius=50000&callback=myCallback&page_size=10&page_index=0';
  page: number = 0;

  ngOnInit() {
    this.loadMore();
  }

  back() {
    this.navCtrl.pop(null, null);
  }

  loadMore(infiniteScroll?) {
    this.http
        .jsonp(this.url.substr(0,this.url.length-1) + this.page,'callback')
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

  doRefresh(event): void {
    this.http
      .jsonp(this.url, 'callback')
      .subscribe(res => {
        this.stores = res['contents'];
        this.page = 2;
        event.complete();
      }, err => {
        event.complete();
      })
  }
}
