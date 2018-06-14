import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import fetch from 'node-fetch';

import { BillingPage } from '../billing/billing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	constructor(public navCtrl: NavController) { };

  billhome(){
      this.navCtrl.push(BillingPage);
  }

}
