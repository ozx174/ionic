import {NgModule} from '@angular/core';
import {MoneyUnitPipe} from './money-unit';

@NgModule({
  declarations: [MoneyUnitPipe],
  exports: [MoneyUnitPipe]
})

export class MoneyUnitModule {
}
