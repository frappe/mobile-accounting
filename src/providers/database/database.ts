import { Platform } from 'ionic-angular';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/Rx';
import frappe from 'frappejs';
//import IonicSqlite from 'frappejs/backends/ionicsqlite';
import { FilePath } from '@ionic-native/file-path';

@Injectable()
export class DatabaseProvider{
  database: SQLiteObject;
  owner:string='Administrator';
  date:string;
  t:any;
  private databaseReady: BehaviorSubject<boolean>;
  frappe:any;
  data = [];

  constructor(public filePath: FilePath, public http: Http, private sqlitePorter: SQLitePorter, private storage: Storage, private sqlite: SQLite, private platform: Platform) {
    //super();
    this.data = ['Administrator','Administrator']
    this.databaseReady = new BehaviorSubject(false);
    //this.frappe = new IonicSqlite();
    //this.frappe.print();
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
    this.filePath.resolveNativePath('')
    .then(filePath => console.log("File is :"+filePath))
    .catch(err => console.log(err));
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
  addOne(doctype,list,num) {
    this.date = JSON.stringify(new Date());
    this.data.push(this.date);  // creation
    this.data.push(this.date);  //modifiedBy
    this.data.push('');  //keywords
    for (var i in list){
      this.data.push(list[i]);  //remaining values
    }
    //this.frappe.print();
    console.log(this.data);
    return this.frappe.addOne(doctype,this.data,num,this.database);
  }

  getAll(doctype,condition) {
    return this.frappe.getAll(doctype,condition,this.database);
  }

  deleteOne(doctype,old_name){
    return this.frappe.deleteOne(doctype,old_name,this.database);
  }

  getOne(doctype,name){
    return this.frappe.getOne(doctype,name,this.database);
  }

//   <------ Items End ------>

//  <------- Party ------->

//   addParty(name,customer,supplier) {
//     this.date = JSON.stringify(new Date());
//     let data = [this.owner,this.owner,this.date,this.date,name,customer,supplier];
//     console.log('insert data: ', data);
//     return this.database.executeSql("INSERT INTO Party (owner,modifiedBy,creation,modified,name,customer,supplier) VALUES (?, ?, ?, ?, ?, ?, ?)", data).then(res => {
//       return res;
//     })
//     .catch(err => {
//       console.log('error: ', err);
//     });
//   }
//
//   deleteParty(old_name){
//     return this.database.executeSql("DELETE FROM Party WHERE name=?",[old_name])
//     .then(res => {
//       return res;
//     })
//     .catch(err => {
//       console.log('error: ', err);
//     });
//   }
//
// //  <------- Party End ------->
//
// //   <------ Customers ------->
//
//   getAllCustomers() {
//     return this.database.executeSql("SELECT * FROM Party where customer=1 ", []).then(data => {
//       let items = [];
//       if (data.rows.length > 0) {
//         for (var i = 0; i < data.rows.length; i++) {
//           items.push({name: data.rows.item(i).name});
//         }
//       }
//       return items;
//     }, err => {
//       console.log('Error: ', err);
//       return [];
//     })
//   }
//
// //  <------- Customers End ------->
//
// //  <------- Suppliers ------->
//
//   getAllSuppliers() {
//     return this.database.executeSql("SELECT * FROM Party where supplier=1 ", []).then(data => {
//       let items = [];
//       if (data.rows.length > 0) {
//         for (var i = 0; i < data.rows.length; i++) {
//           items.push({name: data.rows.item(i).name});
//         }
//       }
//       return items;
//     }, err => {
//       console.log('Error: ', err);
//       return [];
//     })
//   }

//  <------- Suppliers End ------->

  getDatabaseState() {
    return this.databaseReady.asObservable();
  }
}
