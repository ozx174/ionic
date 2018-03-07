import {Component, ViewChild, ElementRef} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the BmapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
// baidu map
declare let BMap; //消除 tsc 编译器报错

@IonicPage()
@Component({
  selector: 'page-bmap',
  templateUrl: 'bmap.html',
})
export class BmapPage {

  @ViewChild('bmap') bmap: ElementRef;
  map: any;//地图对象
  marker: any;//标记

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController) {
  }

  ionViewDidEnter() {
    let map = this.map = new BMap.Map(this.bmap.nativeElement, { enableMapClick: true });//创建地图实例
    let point = new BMap.Point(this.navParams.get('longitude'),this.navParams.get('latitude'));//坐标可以通过百度地图坐标拾取器获取
    map.centerAndZoom(point, 15);//设置中心和地图显示级别
    let marker = new BMap.Marker(point);  // 创建标注
    map.addOverlay(marker);              // 将标注添加到地图中
    map.addControl(new BMap.NavigationControl());
    let opts = {
      width : 200,     // 信息窗口宽度
      title : this.navParams.get('name') , // 信息窗口标题
    };
    let infoWindow = new BMap.InfoWindow(this.navParams.get('address'), opts);  // 创建信息窗口对象
    marker.addEventListener("click", function(){
      marker.openInfoWindow(infoWindow,point); //开启信息窗口
    });
    marker.openInfoWindow(infoWindow,point); //开启信息窗口
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
