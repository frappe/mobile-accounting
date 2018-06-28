import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { AddPage } from '../add/add';
@IonicPage()
@Component({
	selector: 'page-inventory',
	templateUrl: 'inventory.html',
})
export class InventoryPage {
	addPressed: int=0;
	ind: int=0;
	public items = [];
	addButtonPane: string = "addPaneClose";
	addButton: string = "addButtonClose";
	constructor(public navCtrl: NavController, public modalCtrl: ModalController) {}
	ionViewDidLoad() {
		console.log('ionViewDidLoad InventoryPage');
	}

	add(){
		if(this.addPressed==0){
			this.title = "";
			this.stock = "";
			this.addButtonPane = 'addPaneOpen';
			this.addButton = 'addButtonOpen';
			this.addPressed=1;
		}
		else if(this.addPressed==1){
			let newItem = {
				title: this.title,
				stock: this.stock
			};
			this.items.push(newItem);
			this.addPressed=0;
			this.close();
		}
		else if(this.addPressed==2){
			let newItem = {
				title: this.title,
				stock: this.stock
			};
			if(this.ind > -1){this.items[this.ind] = newItem;}
			this.addPressed=0;
			this.close();
		}
		
	}
	close(){
		this.addButtonPane = 'addPaneClose';
		this.addButton = 'addButtonClose';
		this.addPressed=0;
	}
	edit(item){
		this.title = item.title;
		this.stock = item.stock;
		this.addButtonPane = 'addPaneOpen';
		this.addButton = 'addButtonOpenEdit';
		this.addPressed=2;
		this.ind=this.items.indexOf(item);
	}
	delete(item){
		let index = this.items.indexOf(item);
		if(index > -1){
			this.items.splice(index, 1);
		}
	}
}
