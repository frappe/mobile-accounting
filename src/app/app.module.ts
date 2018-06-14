import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import initFrappe from "../frappe";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BillingPage } from '../pages/billing/billing';
import { SupplierPage } from '../pages/supplier/supplier';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BillingPage,
    SupplierPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BillingPage,
    SupplierPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
	constructor() {
		initFrappe();
	};
}
