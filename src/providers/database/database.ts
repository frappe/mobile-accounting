import { Platform } from 'ionic-angular';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/Rx';
import frappe from 'frappejs';
import IonicSqlite from 'frappejs/backends/ionicsqlite';

@Injectable()
export class DatabaseProvider{
  database: SQLiteObject;
  owner:string='Administrator';
  date:string;
  t:any;
  private databaseReady: BehaviorSubject<boolean>;
  frappe:any;

  constructor(public http: Http, private sqlitePorter: SQLitePorter, private storage: Storage, private sqlite: SQLite, private platform: Platform) {
    //super();
    this.databaseReady = new BehaviorSubject(false);
    this.frappe = new IonicSqlite();
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'test.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
        this.database = db;
        // this.storage.get('database_filled').then(val => {
        //   if (val) {
        //     this.databaseReady.next(true);
        //   } else {
        //     this.fillDatabase();
        //   }
        // })
        this.fillDatabase();
      });
    });
  }

  fillDatabase(){
    this.http.get('assets/tables.sql')
    .map(res => res.text())
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.database, sql)
      .then(data => {
        this.databaseReady.next(true);
        //this.storage.set('database_filled', true);
      })
      .catch(e => console.log(e));
    });
  }

// <------ Items ------->
  addItem(list,num) {
    this.date = JSON.stringify(new Date());
    var x = '?, ';
    var y = x.repeat(12);
    console.log(y);
    let data = [this.owner,this.owner,this.date,this.date,'',list['name'],list['description'],list['unit'],'','','',list['rate']];
    console.log('insert data: ', data);
    return this.database.executeSql("INSERT INTO Item VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, )", data).then(res => {
      return res;
    })
    .catch(err => {
      console.log('error: ', err);
    });
  }

  getAllItems() {
    return this.database.executeSql("SELECT * FROM Item", []).then(data => {
      let items = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          items.push({name: data.rows.item(i).name, description: data.rows.item(i).description, unit: data.rows.item(i).unit,rate: data.rows.item(i).rate});
        }
      }
      return items;
    }, err => {
      console.log('Error: ', err);
      return [];
    })
  }

  deleteItem(old_name){
    return this.database.executeSql("DELETE FROM Item WHERE name=?",[old_name])
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log('error: ', err);
    });
  }

  getItem(name){
    //console.log(name);
    return this.database.executeSql('SELECT * FROM Item WHERE name=?',[name])
    .then(data => {
      //console.log(data.rows.length);
      let temp = {name: data.rows.item(0).name, description: data.rows.item(0).description, unit: data.rows.item(0).unit,rate: data.rows.item(0).rate};
      return temp;
    })
    .catch(err => {
      console.log('error: ',err);
    });
  }

//   <------ Items End ------>

//  <------- Party ------->

  addParty(name,customer,supplier) {
    this.date = JSON.stringify(new Date());
    let data = [this.owner,this.owner,this.date,this.date,name,customer,supplier];
    console.log('insert data: ', data);
    return this.database.executeSql("INSERT INTO Party (owner,modifiedBy,creation,modified,name,customer,supplier) VALUES (?, ?, ?, ?, ?, ?, ?)", data).then(res => {
      return res;
    })
    .catch(err => {
      console.log('error: ', err);
    });
  }

  deleteParty(old_name){
    return this.database.executeSql("DELETE FROM Party WHERE name=?",[old_name])
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log('error: ', err);
    });
  }

//  <------- Party End ------->

//   <------ Customers ------->

  getAllCustomers() {
    return this.database.executeSql("SELECT * FROM Party where customer=1 ", []).then(data => {
      let items = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          items.push({name: data.rows.item(i).name});
        }
      }
      return items;
    }, err => {
      console.log('Error: ', err);
      return [];
    })
  }

//  <------- Customers End ------->

//  <------- Suppliers ------->

  getAllSuppliers() {
    return this.database.executeSql("SELECT * FROM Party where supplier=1 ", []).then(data => {
      let items = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          items.push({name: data.rows.item(i).name});
        }
      }
      return items;
    }, err => {
      console.log('Error: ', err);
      return [];
    })
  }

//  <------- Suppliers End ------->

  getDatabaseState() {
    return this.databaseReady.asObservable();
  }
}
