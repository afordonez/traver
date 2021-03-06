import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore'; import { environment } from '../environments/environment';
import { ModalPageModule } from '../app/modal/modal/modal.module';
import {ModalResumenPageModule}from '../app/modal/modal-resumen/modal-resumen.module';
import { HttpClientModule } from '@angular/common/http';
import { HereService } from './servicios/here.service';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    ModalPageModule,
    ModalResumenPageModule,
    HttpClientModule,
  ]
  ,
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HereService
    

  ],
  bootstrap: [AppComponent]
})


export class AppModule {

 }
