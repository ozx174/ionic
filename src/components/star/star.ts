import {Component, Input, OnInit} from '@angular/core';

/**
 * Generated class for the StarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'star',
  templateUrl: 'star.html'
})
export class StarComponent implements OnInit {

  @Input() score: number;
  private starArr: Array<any> = [];

  ngOnInit() {
    let stars: number = Math.floor(this.score) || 5;
    for (let i = 0; i < stars; i++) {
      this.starArr.push({
        size: 'star-24',
        id: i
      })
    }
  }

  constructor() {

  }
}
