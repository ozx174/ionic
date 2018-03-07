import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {BillDetailsPage} from './bill-details';
import {HttpClientModule} from '@angular/common/http';
import {ErrSrcDirectiveModule} from '../../directives/err-src/err-src.module';
import {SplitModule} from '../../components/split/split.module';
import {MoneyUnitModule} from '../../pipes/money-unit/money-unit.module'

@NgModule({
  declarations: [
    BillDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BillDetailsPage),
    HttpClientModule,
    ErrSrcDirectiveModule,
    SplitModule,
    MoneyUnitModule,
  ],
})
export class BillDetailsPageModule {
}
