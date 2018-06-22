import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PartyEditPage } from './party-edit';

@NgModule({
  declarations: [
    PartyEditPage,
  ],
  imports: [
    IonicPageModule.forChild(PartyEditPage),
  ],
})
export class PartyEditPageModule {}
