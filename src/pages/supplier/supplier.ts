import { Component,Input } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController,ToastController  } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BillingPage } from '../billing/billing';
/**
 * Generated class for the SupplierPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-supplier',
  templateUrl: 'supplier.html',
})
export class SupplierPage {
  valid:Boolean;
  partylist1:Array<String>;
  partylist2:Array<String>;
  @Input() name;
  customer:Boolean;
  supplier:Boolean;
  frappe:any;
  act_customer:any;
  act_supplier:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    this.valid = true;
  }

  async ionViewDidLoad() {
    this.partylist1 = [''];
    this.partylist2 = [''];
    this.frappe = (<any>window).frappe;
    let temp1 = await this.frappe.db.getAll({doctype:'Party',fields:['name','customer','supplier'],filters:{customer:['like','1']}});
    let temp2 = await this.frappe.db.getAll({doctype:'Party',fields:['name','customer','supplier'],filters:{supplier:['like','1']}});
    //setTimeout(function(){}, 3000);
    for(var i=0;i<temp1.length;i++)
    {
      this.partylist1.push(temp1[i]['name']);
    }
    this.partylist1.shift();
    for(var i=0;i<temp2.length;i++)
    {
      this.partylist2.push(temp2[i]['name']);
    }
    this.partylist2.shift();
    console.log(this.partylist1);
    console.log(this.partylist2);
  }

  supplier_done(){
    if(!this.name)
    {
      this.valid = false;
    }
    else
    {
      this.valid = true;
    }
    if(!this.customer && !this.supplier)
    {
      this.show_toast("Select atleast one of the options");
    }
    else
    {
      if(this.valid)
      {
        console.log("Success");
        this.saveSupplier();
      }
    }
  }

  async saveSupplier() {
    if(this.customer) this.act_customer=1; else this.act_customer = 0;
    if(this.supplier) this.act_supplier=1; else this.act_supplier = 0;
		let temp_data = {"name": this.name,"customer":this.act_customer,"supplier":this.act_supplier };
    console.log(temp_data);
    await this.frappe.db.insert("Party",temp_data);
    this.add_supplier(this.name);
	}


  updateCustomer(){
    console.log(this.customer);
  }

  updateSupplier(){
    console.log(this.supplier);
  }

  add_supplier(id){
    // here data to send to billing page;
    this.navCtrl.push(BillingPage); //will pass data as 2nd argument
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
