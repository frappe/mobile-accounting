import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemEditPage } from './item-edit';

@NgModule({
  declarations: [
    ItemEditPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemEditPage),
  ],
})
export class ItemEditPageModule {}
