import { DatabaseProvider } from './../../../providers/database/database';
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
  valid:Boolean;
  valid2:Boolean;
  item = {};
  //frappe:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private databaseProvider: DatabaseProvider) {
    this.valid = true;
    this.valid2 = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemEditPage');
    //this.frappe = (<any>window).frappe;
  }

  item_done(){
    if(!this.item.name){
      this.valid = false;
    }
    else{
      this.valid = true;
    }
    if(!this.item.rate){
      this.valid2 = false;
    }
    else{
      if(this.rate)
      this.valid2 = true;
    }
    if(this.valid && this.valid2){
      console.log(this.item.description);
      this.addItem();
    }
  }

  unit_selected(temp){
    this.item.unit = temp;
  }

  // saveItem(){
  //   let temp = {'name':this.name,'description':this.description,'unit':this.unit,'rate':this.rate};
  //   await this.frappe.db.insert('Item',temp);
  //   this.navCtrl.push(ListPage,{'pageTitle':'Items','docname':'Item'});
  // }

  addItem() {
    this.databaseProvider.addItem(this.item['name'], this.item['description'], this.item['unit'],this.item['rate'])
    .then(data => {
       this.navCtrl.push(ListPage,{'pageTitle':'Items','docname':'Item'});
    });
    this.item = {};
  }
}
