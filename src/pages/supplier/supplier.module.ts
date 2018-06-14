import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupplierPage } from './supplier';

@NgModule({
  declarations: [
    SupplierPage,
  ],
  imports: [
    IonicPageModule.forChild(SupplierPage),
  ],
})
export class SupplierPageModule {}
