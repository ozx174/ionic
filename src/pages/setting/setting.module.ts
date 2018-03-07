import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {SettingPage} from './setting';
import {SplitModule} from '../../components/split/split.module'
import {HttpClientModule} from '@angular/common/http'

@NgModule({
  declarations: [
    SettingPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingPage),
    SplitModule,
    HttpClientModule,
  ],
})
export class SettingPageModule {
}
