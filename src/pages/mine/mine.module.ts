import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {MinePage} from './mine';
import {ErrSrcDirectiveModule} from '../../directives/err-src/err-src.module';

@NgModule({
  declarations: [
    MinePage,
  ],
  imports: [
    IonicPageModule.forChild(MinePage),
    ErrSrcDirectiveModule,
  ],
})
export class MinePageModule {
}
