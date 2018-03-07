/**
 * Generated class for the ErrSrcDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
import { Directive,Input } from '@angular/core';
@ Directive({
  selector: '[err-src]', // Attribute selector
  host: {
    '(error)': 'onError($event.target)'
  }
})
export class ErrSrcDirective {

  constructor() {}

  private image = './assets/img/store_list/mo_icon_1.png';

  @Input('err-src')
  set backImg(img:string) {
    if (img) this.image = img;
  }

  onError(e) {
    e.src = this.image;
  }
}
