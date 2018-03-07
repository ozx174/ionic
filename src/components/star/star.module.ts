import {NgModule} from '@angular/core';
import {StarComponent} from './star';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    StarComponent,
  ],
  imports: [CommonModule],
  exports: [
    StarComponent,
  ]
})
export class StarModule {
}
