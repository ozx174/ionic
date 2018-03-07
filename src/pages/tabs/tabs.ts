import {Component, ViewChild} from '@angular/core';
import {IonicPage, Tabs, NavController} from 'ionic-angular';


/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'HomePage';
  tab2Root = 'StoreNearbyPage';
  tab3Root = 'MinePage';

  @ViewChild('myTabs') tabRef: Tabs;
  constructor(public navCtrl: NavController) {

  }

  change() {
    if (localStorage.getItem('token')) {
      this.tabRef.select(2);
    } else {
      this.navCtrl.push('LoginPage')
    }
  }
}
