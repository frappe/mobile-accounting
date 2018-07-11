import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { SQLite } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';

import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';

import { DatabaseProvider } from '../providers/database/database';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PartyInsertPage } from '../pages/insert/party-insert/party-insert';
import { ListPage } from '../pages/list/list';
import { PartyEditPage } from '../pages/edit/party-edit/party-edit';
import { ItemEditPage } from '../pages/edit/item-edit/item-edit';
import { ItemInsertPage } from '../pages/insert/item-insert/item-insert';


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
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
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
    SQLite,
    SQLitePorter,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider
  ]
})
export class AppModule {
}
