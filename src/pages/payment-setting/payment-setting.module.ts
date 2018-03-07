import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentSettingPage } from './payment-setting';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    PaymentSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentSettingPage),
    HttpClientModule
  ],
})
export class PaymentSettingPageModule {}
