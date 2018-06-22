import { Component,Input } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController,ToastController  } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup } from '@angular/forms';
/**
 * Generated class for the ItemEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 import { ListPage } from '../../list/list';

@IonicPage()
@Component({
  selector: 'page-item-edit',
  templateUrl: 'item-insert.html',
})
export class ItemInsertPage {
  unit:any;
  valid:Boolean;
  valid2:Boolean;
  @Input() name;
  @Input() rate;
  @Input() description;
  frappe:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.valid = true;
    this.valid2 = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemEditPage');
    this.frappe = (<any>window).frappe;
  }

  item_done(){
    if(!this.name){
      this.valid = false;
    }
    else{
      this.valid = true;
    }
    if(!this.rate){
      this.valid2 = false;
    }
    else{
      if(this.rate)
      this.valid2 = true;
    }
    if(this.valid && this.valid2){
      console.log(this.description);
      this.saveItem();
    }
  }

  unit_selected(temp){
    this.unit = temp;
  }

  async saveItem(){
    let temp = {'name':this.name,'description':this.description,'unit':this.unit,'rate':this.rate};
    await this.frappe.db.insert('Item',temp);
    this.navCtrl.push(ListPage,{'pageTitle':'Items','docname':'Item'});
  }
}
