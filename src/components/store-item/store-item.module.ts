import {NgModule} from '@angular/core';
import {StoreItemComponent} from './store-item';
import {StarModule} from '../star/star.module';
import {ErrSrcDirectiveModule} from '../../directives/err-src/err-src.module'

@NgModule({
  declarations: [
    StoreItemComponent,
  ],
  imports: [StarModule, ErrSrcDirectiveModule],
  exports: [
    StoreItemComponent,
  ]
})
export class StoreItemModule {
}
