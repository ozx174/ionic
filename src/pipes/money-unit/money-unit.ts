import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the MoneyUnitPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'moneyUnit',
})
export class MoneyUnitPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: number, ...args) {
    if (!value) {
      return '0.00'
    }
    return Number(value).toFixed(2);
  }
}
