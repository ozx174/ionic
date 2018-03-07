import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {StoreListPage} from './store-list';
import {StoreItemModule} from '../../components/store-item/store-item.module';
import {HttpClientModule, HttpClientJsonpModule} from '@angular/common/http'

@NgModule({
  declarations: [
    StoreListPage,
  ],
  imports: [
    IonicPageModule.forChild(StoreListPage),
    StoreItemModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
})
export class StoreListPageModule {
}
