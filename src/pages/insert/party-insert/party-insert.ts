import { DatabaseProvider } from './../../../providers/database/database';
import { Component,Input } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController,ToastController  } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup } from '@angular/forms';
/**
 * Generated class for the SupplierPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { ListPage } from '../../list/list';


@IonicPage()
@Component({
  selector: 'page-party-insert',
  templateUrl: 'party-insert.html',
})
export class PartyInsertPage {
  list:Array<String>
  valid:Boolean;
  title:any;
  party = {};
  //frappe:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,private databaseProvider: DatabaseProvider) {
    this.valid = true;
    this.title = this.navParams.get('title');
  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad PartyInsertPage');
    //this.frappe = (<any>window).frappe;
  }

  party_done(){
    if(!this.party['name']){
      this.valid = false;
    }
    else{
      this.valid = true;
    }
    if(this.valid)
    {
      console.log("Success");
      this.addParty();
    }
  }

  addParty() {
    // if(this.customer) this.act_customer=1; else this.act_customer = 0;
    // if(this.supplier) this.act_supplier=1; else this.act_supplier = 0;
    if(this.title == 'Customers')
      this.databaseProvider.addOne('Party',[this.party['name'],1,0],8)
      .then(data => {
        this.navigate();
      });
    else if(this.title == 'Suppliers')
      this.databaseProvider.addOne('Party',[this.party['name'],0,1],8)
      .then(data => {
        this.navigate();
      });
    //await this.frappe.db.insert("Party",temp_data);
  }


  // updateCustomer(){
  //   console.log(this.customer);
  // }
  //
  // updateSupplier(){
  //   console.log(this.supplier);
  // }

  navigate(){
    // here data to send to billing page;
    this.navCtrl.push(ListPage,{'pageTitle':this.title,'docname':'Party'}); //will pass data as 2nd argument
  }

  show_toast(message, time=1000, position="bottom") {
		let toast = this.toastCtrl.create({
			message: message,
			duration: time,
			position: position
		});

		toast.present();
	}
}
