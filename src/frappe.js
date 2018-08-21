import frappe from 'frappejs';
import common from 'frappejs/common';
import models from 'frappejs/models';
import Database from 'frappejs/backends/database';
//import SqliteDatabase from 'frappejs/backends/sqlite';
import IonicSqlite from './ionicsqlite';
import io from 'socket.io-client';
import Observable from 'frappejs/utils/observable';

import fetch from 'node-fetch';

// Enter your ip:8000 here
let server = 'localhost:8000';

export default async function initFrappe() {
	// if(serv) {
	// 	server = serv;
	// }
	Object.assign(window, {
	  frappe
	});
	frappe.fetch = fetch.bind();

	frappe.init();
	frappe.registerLibs(common);
	frappe.registerModels(models, 'client');
	console.log('hello');
	try{
		frappe.db =  new IonicSqlite();
	}
	catch(Error){
		console.log(Error.message);
	}
	// console.log(frappe.db);
	console.log('hello');
	//console.log('hello');

	//frappe.db.insert('Party',{'name':'tim','customer':1,'supplier':0});
	// console.log('hello');

	//var temp = await frappe.db.getAll({doctype:this.docname,fields:['name'],filters:{customer:['like','1']}});
	// console.log('hello');

	// console.log(temp);
	//const socket = io.connect('http://' + server);
	//frappe.db.bindSocketClient(socket);
	frappe.docs = new Observable();
}
