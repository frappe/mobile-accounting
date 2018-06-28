import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemInsertPage } from './item-insert';

@NgModule({
  declarations: [
    ItemInsertPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemInsertPage),
  ],
})
export class ItemInsertPageModule {}
