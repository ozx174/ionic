import {Component, Input, OnInit} from '@angular/core';

/**
 * Generated class for the StoreItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'store-item',
  templateUrl: 'store-item.html'
})
export class StoreItemComponent implements OnInit{

  @Input() storeData: any;

  constructor() {}

  ngOnInit() {
  }

 }

