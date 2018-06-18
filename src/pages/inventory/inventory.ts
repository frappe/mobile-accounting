import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html',
})
export class InventoryPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}
  ionViewDidLoad() {
    console.log('ionViewDidLoad InventoryPage');
  }

}
