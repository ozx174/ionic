import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BmapPage } from './bmap';

@NgModule({
  declarations: [
    BmapPage,
  ],
  imports: [
    IonicPageModule.forChild(BmapPage),
  ],
})
export class BmapPageModule {}
