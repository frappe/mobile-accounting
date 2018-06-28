import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PartyInsertPage } from './party-insert';

@NgModule({
  declarations: [
    PartyInsertPage,
  ],
  imports: [
    IonicPageModule.forChild(PartyInsertPage),
  ],
})
export class PartyInsertPageModule {}
