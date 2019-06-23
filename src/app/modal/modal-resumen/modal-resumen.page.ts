import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import {ViajesService} from '../../servicios/viajes.service';
import {HereService} from '../../servicios/here.service';
import {Viaje} from '../../model/viaje';
import {Location} from '../../model/ubicaciones'
import { strict } from 'assert';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-modal-resumen',
  templateUrl: './modal-resumen.page.html',
  styleUrls: ['./modal-resumen.page.scss'],
})
export class ModalResumenPage implements OnInit {
  mimodal: ModalResumenPage;
  protected viaje: Viaje;
  protected viaje2: Viaje;
  
  id;
  constructor(private modalCrl: ModalController,
    private viajeS: ViajesService,
    private hereS: HereService,
    private loadingController: LoadingController
  ) { 
      
  }

  ngOnInit() {
    console.log(this.id);
    //this.recuperaViaje(this.id);
    this.presentLoading("Cargando");
    this.viajeS.leeViaje(this.id)
    .subscribe((consulta)=>{
      this.viaje = {id: consulta.id,...consulta.data()};
      this.loadingController.dismiss();
      let latitudeOr:string;
      let longitudeOr:string;
      let latitudeDes:string;
      let longitudeDes:string;
      let distance:number;
      this.hereS.geocoding(this.viaje.locIdOrigen)
      
      .subscribe(json=>{
        
        console.log(json);
        latitudeOr = json["0"]["0"].latitude;
        longitudeOr = json["0"]["0"].longitude;
        console.log("Latitude "+latitudeOr)
        console.log("Longitude "+longitudeOr)
        this.hereS.geocoding(this.viaje.locIdDestino)
        .subscribe(json=>{
          latitudeDes = json["0"]["0"].latitude;
          longitudeDes = json["0"]["0"].longitude;
          console.log("Latitude "+latitudeDes)
          console.log("Longitude "+longitudeDes)
  
          this.hereS.route(latitudeOr,longitudeOr,latitudeDes,longitudeDes)
          .subscribe(json=>{
            //console.log("Distancia: "+json.response.route["0"].sumary.distance);
            //console.log(json["0"].summary.distance);
            distance = ((json["0"].summary.distance)/1000);
            console.log("La distancia en kilómetros es: "+distance)
  
            let viaje: Viaje = {
              id: this.viaje.id,
              conductor: this.viaje.conductor,
              fecha: this.viaje.fecha,
              ganancia: this.viaje.ganancia,
              origen: this.viaje.origen,
              destino: this.viaje.destino,
              realizado: this.viaje.realizado,
              locIdOrigen: this.viaje.locIdOrigen,
              locIdDestino: this.viaje.locIdDestino,
              latitudeOr: latitudeOr,
              longitudeOr: longitudeOr,
              latitudeDes: latitudeDes,
              longitudeDes: longitudeDes,
              distance: distance
  
            }
            this.viajeS.actualizaViaje(viaje.id,viaje)
            .then(()=>{
              console.log("viaje actualizado")
              this.viajeS.leeViaje(viaje.id)
                .subscribe((consulta)=>{
                this.viaje= {id: consulta.id,...consulta.data()}
                
                console.log (this.viaje.conductor);
                console.log(this.viaje.distance)
              })
            })
            .catch(()=>{
              console.log ("Error actualizando el viaje")
            })
  
            
          
            //this.viajeS.actualizaViaje()
          })
        })
      })
    })
   


  }

  async recuperaViaje(id){
    
  }

  async presentLoading(msg) {
    const myloading = await this.loadingController.create({
      message: msg
    });
    return await myloading.present()
    ; }
}
