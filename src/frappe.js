import frappe from 'frappejs';

import common from 'frappejs/common';
import models from 'frappejs/models';
import HTTPClient from 'frappejs/backends/http';
import io from 'socket.io-client';
import Observable from 'frappejs/utils/observable';

import fetch from 'node-fetch';

// Enter your ip:8000 here
let server = 'localhost:8000';

export default async function initFrappe(serv) {
	if(serv) {
		server = serv;
	}
	Object.assign(window, {
	  frappe
	});
	frappe.fetch = fetch.bind();

	frappe.init();
	frappe.registerLibs(common);
	frappe.registerModels(models, 'client');
	frappe.db = await new HTTPClient({server: server});
	const socket = io.connect('http://' + server);
	frappe.db.bindSocketClient(socket);
	frappe.docs = new Observable();
}
