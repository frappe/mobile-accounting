import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import initFrappe from "../frappe";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PartyInsertPage } from '../pages/insert/party-insert/party-insert';
import { ListPage } from '../pages/list/list';
import { PartyEditPage } from '../pages/edit/party-edit/party-edit';
import { ItemEditPage } from '../pages/edit/item-edit/item-edit';
import { ItemInsertPage } from '../pages/insert/item-insert/item-insert';
import { SQLite } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PartyInsertPage,
    ListPage,
    PartyEditPage,
    ItemInsertPage,
    ItemEditPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PartyInsertPage,
    ListPage,
    PartyEditPage,
    ItemInsertPage,
    ItemEditPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
	{provide: ErrorHandler, useClass: IonicErrorHandler},
	SQLite,
	Toast
  ]
})
export class AppModule {
	constructor() {
		initFrappe();
	};
}
