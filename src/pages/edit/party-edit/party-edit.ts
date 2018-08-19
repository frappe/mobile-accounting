import { DatabaseProvider } from './../../../providers/database/database';
import { Component,Input } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController,ToastController  } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup } from '@angular/forms';
/**
 * Generated class for the CustomerEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { ListPage } from '../../list/list';


@IonicPage()
@Component({
  selector: 'page-party-edit',
  templateUrl: 'party-edit.html',
})
export class PartyEditPage {
  list:Array<String>
  cust_name:any;
  valid:Boolean;
  title:any;
  @Input() name;
  customer:Boolean;
  supplier:Boolean;
  //frappe:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,private databaseProvider: DatabaseProvider) {
    this.cust_name = this.navParams.get('cust_name');
    this.valid = true;
    this.title = this.navParams.get('title');
    console.log(this.title);
    if(this.title == 'Customers')
      this.customer = true;
    else if(this.title == 'Suppliers')
      this.supplier = true;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerEditPage');
    //this.frappe = (<any>window).frappe;
  }

  party_done(){
    if(!this.name){
      this.valid = false;
    }
    else{
      this.valid = true;
    }
    if(this.valid){
      console.log("Success");
      this.updateParty();
    }
  }

  updateParty() {
    if(this.customer){
      this.databaseProvider.deleteOne('Party',this.cust_name)
      .then(data => {
      });
      this.databaseProvider.addOne('Party',[this.name,1,0],8)
      .then(data => {
      this.navigate();
      });
    }
    if(this.supplier){
      this.databaseProvider.deleteOne('Party',this.cust_name)
      .then(data => {
      });
      this.databaseProvider.addOne('Party',[this.name,0,1],8)
      .then(data => {
      this.navigate();
      });
    //let temp_data = {"name": this.name,"customer":this.act_customer,"supplier":this.act_supplier };
    //console.log(temp_data);
    //await this.frappe.db.delete('Party',this.cust_name);
    //await this.frappe.db.insert("Party",temp_data);
    }
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
