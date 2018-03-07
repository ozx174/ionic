import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {StorePage} from './store';
import {StarModule} from '../../components/star/star.module'
import {HttpClientModule, HttpClientJsonpModule} from '@angular/common/http'

@NgModule({
  declarations: [
    StorePage,
  ],
  imports: [
    IonicPageModule.forChild(StorePage),
    StarModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ],
})
export class StorePageModule {
}
