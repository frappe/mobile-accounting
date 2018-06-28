import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
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
  list:Array<String>;
  pageTitle:any;
  docname:any;
  frappe:any;
  constructor(public navCtrl: NavController,private alertCtrl: AlertController, public navParams: NavParams) {
    this.pageTitle = this.navParams.get('pageTitle');
    this.docname = this.navParams.get('docname');
    this.loadlist();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

  async loadlist(){
    this.frappe = (<any>window).frappe;
    this.list = [''];
    if(this.pageTitle == 'Customers'){
      var temp = await this.frappe.db.getAll({doctype:this.docname,fields:['name'],filters:{customer:['like','1']}});
    }
    else if(this.pageTitle == 'Suppliers'){
      var temp = await this.frappe.db.getAll({doctype:this.docname,fields:['name'],filters:{supplier:['like','1']}});
    }
    else{
      var temp = await this.frappe.db.getAll({doctype:this.docname,fields:['name']});
    }
    for(var i=0;i<temp.length;i++)
    {
      this.list.push(temp[i]['name']);
    }
    this.list.shift();
  }

  async edit(curr_name) {
    console.log(curr_name,this.docname);
    if(this.docname == 'Party')
      this.navCtrl.push(PartyEditPage,{'cust_name':curr_name,'title':this.pageTitle});
    else if(this.docname == 'Item'){
      let temp = await this.frappe.db.get('Item',curr_name);
      this.navCtrl.push(ItemEditPage,{'item_name':curr_name,'item_description':temp['description'],'item_rate':temp['rate'],'item_unit':temp['unit']});
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
