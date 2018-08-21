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
  templateUrl: 'item-edit.html',
})
export class ItemEditPage {
  unit:any;
  valid:Boolean;
  @Input() name;
  @Input() rate;
  valid2:Boolean;
  @Input() description;
  item_name:any;
  item_rate:any;
  item_description:any;
  unit_list:Object;
  item_unit:Array<Boolean>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public databaseProvider: DatabaseProvider) {
    this.valid = true;
    this.valid2 = true;
    this.item_name = this.navParams.get('item_name');
    this.item_description = this.navParams.get('item_description');
    this.item_rate = this.navParams.get('item_rate');
    let temp = this.navParams.get('item_unit');
    this.unit_list = {'Kg':0,'Gram':1,'Hour':2,'Day':3};
    this.item_unit = [false,false,false,false];
    this.item_unit[this.unit_list[temp]] = true;
    this.unit = temp;
    console.log(this.item_description);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemEditPage');
    //this.frappe = (<any>window).frappe;
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
      this.updateItem();
    }
  }

  unit_selected(temp){
    this.unit = temp;
  }

  updateItem(){
    //await this.frappe.db.delete('Item',this.item_name);
    this.databaseProvider.deleteOne('Item',this.item_name)
    .then(data => {
      //item deleted
    });
    //let temp = {'name':this.name,'description':this.description,'unit':this.unit,'rate':this.rate};
    // this.list['name'] = this.name;
    // this.list['description'] = this.description;
    // this.list['unit'] = this.unit;
    // this.list['rate'] = this.rate;
    let list = [this.name,this.description,this.unit,'','','',this.rate];
    this.databaseProvider.addOne('Item',list,12)
    .then(data => {
       this.navCtrl.push(ListPage,{'pageTitle':'Items','docname':'Item'});
    });
    //await this.frappe.db.insert('Item',temp);
    //this.navCtrl.push(ListPage,{'pageTitle':'Items','docname':'Item'});
  }
}
