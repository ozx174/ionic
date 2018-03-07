import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoreNearbyPage } from './store-nearby';
import {StoreItemModule} from '../../components/store-item/store-item.module';
import {HttpClientModule, HttpClientJsonpModule} from '@angular/common/http'

@NgModule({
  declarations: [
    StoreNearbyPage,
  ],
  imports: [
    IonicPageModule.forChild(StoreNearbyPage),
    StoreItemModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
})
export class StoreNearbyPageModule {}
