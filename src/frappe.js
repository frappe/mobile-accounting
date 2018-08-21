import frappe from 'frappejs';
import common from 'frappejs/common';
import models from 'frappejs/models';
import Database from 'frappejs/backends/database';
//import SqliteDatabase from 'frappejs/backends/sqlite';
import IonicSqlite from 'frappejs/backends/ionicsqlite';
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
	frappe.db = await new IonicSqlite();
	frappe.db.connect();
	//const socket = io.connect('http://' + server);
	//frappe.db.bindSocketClient(socket);
	frappe.docs = new Observable();
}
