import { Component, ViewChild, NgModule } from '@angular/core';
import { IonInfiniteScroll, IonVirtualScroll, NavController} from '@ionic/angular';
import {Viaje} from '../model/viaje';
import { LoadingController} from '@ionic/angular';
import {ViajesService} from '../servicios/viajes.service';
import { AlertController } from '@ionic/angular';
import {ModalPage } from '../modal/modal/modal.page';
import {ModalController} from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],

})

export class Tab1Page {
  @ViewChild('dynamicList') dynamicList;
  @ViewChild('is') infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonVirtualScroll)
  virtualScroll: IonVirtualScroll;
  dataList: Viaje[];
  dataListPanel: Viaje[];
  ultimoViaje: any;
  //i = 0;



  constructor(private viajes: ViajesService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public modalController: ModalController,
    private router: Router,
    private navController: NavController) {

   /* this.dataList = [];
    for (this.i = 0; this.i < 50; this.i++) {
      let viajeFicticio:Viaje={id:this.i,origen:"Origen"+this.i,destino:"Destino"+this.i,conductor:"driver",coste:this.i,realizado:true}
      this.dataList.push(viajeFicticio);
    }*/

  }

  ionViewDidEnter() {


      this.presentLoading('Cargando');
      this.viajes.leeViajesNoRealizadosCada10DesdeElInicio()
      .then((querySnapshot) => {
        this.dataList = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.id);
          //console.log(doc.data());
          const temporal: Viaje = {id: doc.id, ...doc.data()};
          
            this.dataList.push({
            id: doc.id, ...doc.data()
            
          });
          this.ultimoViaje = doc;
          console.log(this.ultimoViaje.data());
          
        });
        this.dataListPanel = this.dataList;

        // this.dataListPanel= this.dataList;
        this.loadingController.dismiss();
      });


      }

 
      cargaMasViajes(event) {

 
    console.log("carga");
    console.log(this.ultimoViaje.data());
    this.viajes.leeViajesNoRealizadosCada10DesdeElUltimoLeido(this.ultimoViaje)
    .then((querySnapshot)=>{
      //console.log(querySnapshot);

      querySnapshot.forEach((doc)=>{
         this.dataList.push({
              id:doc.id,...doc.data()
          });
          this.ultimoViaje = doc;
          console.log(this.ultimoViaje.data());
          this.dataListPanel = this.dataList;
      });
      //console.log(this.dataListPanel.length);

      //let contador:number = 15;
      //console.log(this.dataList[this.i])  
      console.log("Aquí estoy entrando");
      event.target.complete();
    });
    
   
    // this.infiniteScroll.complete;
  }


  async presentLoading(msg) {
    const myloading = await this.loadingController.create({
      message: msg
    });
    return await myloading.present()
    ; }
/*  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPage,
      // componentProps: {value: 1}
    });
    return await modal.present();
  }*/
  
  async presentAlertConfirm(id) {
    const alert = await this.alertController.create({
      header: 'Editar, Eliminar',
      message: '<p style="color:black;">Selecciona editar, o eliminar.</p>',
      buttons: [
        {

          text: 'Editar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            //console.log('No lo elimino');
            this.router.navigate(['/tab2',id]);
            //this.navController.navigateForward(['/tab2', id]);
            
          }
        }, {
          text: 'Eliminar',
          handler: () => {
            //console.log('Confirm Okay');
            this.eliminaViaje(id);
          }
        }
      ]
    });

    await alert.present();
  }

  async eliminaViaje(id) {
    console.log(id);
    this.presentLoading('Eliminando');
    
    this.viajes.borraViaje(id)
    .then(() => {
      console.log('El viaje se ha eliminado correctamente');
      this.loadingController.dismiss();

    })
    .catch(() => {
      console.error('Error eliminando el viaje');

    });

    
  }

  async escribe(item){
    console.log("Has hecho click en un item y este es su id: ",item.id,"Conductor: ",item.conductor);
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: { 
        conductor: item.conductor,
        origen: item.origen,
        destino: item.destino,
        ganancia: item.ganancia,
        fecha: item.fecha
       }
    });
    return await modal.present();
  }
}



