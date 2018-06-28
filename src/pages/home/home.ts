import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Storage } from '@ionic/storage';
import fetch from 'node-fetch';

//import { SupplierPage } from '../supplier/supplier';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	data:any;

	constructor(public navCtrl: NavController, public sqlite: SQLite, public toastCtrl: ToastController) { };

	ionViewDidLoad() {
		this.sqlite.create({
			name: "test.db",
			location: "default",
			createFromLocation: 1
		}).then((db: SQLiteObject) => {
			db.executeSql("select * from party", {}).then((r) => {
				// console.log("Data received: ", data);
				this.data = "hi";
			}, (error) => {
				this.data = "here";
				// console.error("Unable to execute sql", error);
			})
		}, (error) => {
			this.data = "error";
			// console.error("Unable to open database", error);
		});
	}

}
