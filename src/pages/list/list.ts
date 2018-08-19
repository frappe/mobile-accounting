import { DatabaseProvider } from './../../providers/database/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 import { PartyEditPage } from '../edit/party-edit/party-edit';
 import { PartyInsertPage } from '../insert/party-insert/party-insert';
 import { ItemEditPage } from '../edit/item-edit/item-edit';
 import { ItemInsertPage } from '../insert/item-insert/item-insert';

 @IonicPage()
 @Component({
   selector: 'page-list',
   templateUrl: 'list.html',
 })
 export class ListPage {
   list = [];
   pageTitle:any;
   docname:any;
   valid:Boolean;
  //frappe:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private databaseProvider: DatabaseProvider) {
    this.valid=true;
    this.pageTitle = this.navParams.get('pageTitle');
    this.docname = this.navParams.get('docname');
    this.databaseProvider.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.loadlist();
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

  loadlist(){
    //this.frappe = (<any>window).frappe;
    if(this.pageTitle == 'Customers'){
      this.loadCustomersData();
      this.valid=false;
      //var temp = await this.frappe.db.getAll({doctype:this.docname,fields:['name'],filters:{customer:['like','1']}});
    }
    else if(this.pageTitle == 'Suppliers'){
      this.loadSuppliersData();
      this.valid=false;
      //var temp = await this.frappe.db.getAll({doctype:this.docname,fields:['name'],filters:{supplier:['like','1']}});
    }
    else{
      this.loadItemsData();
      //var temp = await this.frappe.db.getAll({doctype:this.docname,fields:['name']});
    }
  }

  loadItemsData() {
    this.databaseProvider.getAllItems('Item').then(data => {
      this.list = data;
    });
  }

  loadCustomersData() {
    this.databaseProvider.getAllCustomers().then(data => {
      this.list = data;
    });
  }

  loadSuppliersData() {
    this.databaseProvider.getAllSuppliers().then(data => {
      this.list = data;
    });
  }

  edit(curr_name) {
    console.log(curr_name,this.docname);
    if(this.docname == 'Party'){
      this.navCtrl.push(PartyEditPage,{'cust_name':curr_name,'title':this.pageTitle});
    }
    else if(this.docname == 'Item'){
      //let temp = await this.frappe.db.get('Item',curr_name);
      this.databaseProvider.getItem(curr_name)
      .then(data => {
        let temp = data;
        console.log(temp['rate']);
        this.navCtrl.push(ItemEditPage,{'item_name':curr_name,'item_description':temp['description'],'item_rate':temp['rate'],'item_unit':temp['unit']});
      });
    }
  }
  delete(curr_name) {
    console.log(curr_name,this.docname);
    if(this.docname == 'Party'){
      this.databaseProvider.deleteParty(curr_name)
      .then(data => {
        this.loadCustomersData();
      });
    }
    else if(this.docname == 'Item'){
      //await this.frappe.db.delete('Item',this.curr_name);
      this.databaseProvider.deleteItem(curr_name)
      .then(data => {
        this.loadItemsData();
      });
    }
  }

  insert(){
    if(this.docname == 'Party'){
      this.navCtrl.push(PartyInsertPage,{'title':this.pageTitle});
    }
    else if(this.docname == 'Item')
      this.navCtrl.push(ItemInsertPage);
  }
}
