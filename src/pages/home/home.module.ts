import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {HomePage} from './home';
import {SplitModule} from '../../components/split/split.module';
import {HttpClientModule} from "@angular/common/http"

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    SplitModule,
    HttpClientModule,
  ],
})
export class HomePageModule {
}
