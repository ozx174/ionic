import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {MinePage} from './mine';
import {HttpClientModule} from '@angular/common/http';
import { ErrSrcDirectiveModule } from '../../directives/err-src/err-src.module';

@NgModule({
  declarations: [
    MinePage,
  ],
  imports: [
    IonicPageModule.forChild(MinePage),
    HttpClientModule,
    ErrSrcDirectiveModule,
  ],
})
export class MinePageModule {
}
