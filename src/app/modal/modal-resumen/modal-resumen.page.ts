import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import {ViajesService} from '../../servicios/viajes.service';
import {HereService} from '../../servicios/here.service';
import {Viaje} from '../../model/viaje';
import {Location} from '../../model/ubicaciones'
import { strict } from 'assert';
import { stringify } from '@angular/compiler/src/util';
import { Map, latLng, tileLayer, Layer, marker, Routing } from 'leaflet';
import'../../../../node_modules/leaflet/dist/leaflet.js';
import '../../../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js';
declare let L;

@Component({
  selector: 'app-modal-resumen',
  templateUrl: './modal-resumen.page.html',
  styleUrls: ['./modal-resumen.page.scss'],
})
export class ModalResumenPage implements OnInit {
  mimodal: ModalResumenPage;
  protected viaje: Viaje;
  protected viaje2: Viaje;
  protected fechaString: string;
  
  id;
  map: Map;
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
  
          this.leafletMap(latitudeOr,longitudeOr,latitudeDes,longitudeDes);
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
            this.fechaString = this.Unix_timestamp(this.viaje.fecha);
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




  leafletMap(latitudeOr: string, longitudeOr: string, latitudeDes: string, longitudeDes: string) {
   
    const map = L.map('mapid').setView([latitudeOr, longitudeOr], 13);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);

		L.Routing.control({
  waypoints: [
    L.latLng(latitudeDes, longitudeDes),
    L.latLng(latitudeOr, longitudeOr)
  ]
  }).addTo(map);

  }

  /** Remove map when we have multiple map object */
  ionViewWillLeave() {
    this.map.remove();
  }

  async recuperaViaje(id){
    
  }

  async presentLoading(msg) {
    const myloading = await this.loadingController.create({
      message: msg
    });
    return await myloading.present()
    ; }

    Unix_timestamp(t)
    {
    var dt = new Date(t*1000);
    var yr = dt.getFullYear();
    var mt = dt.getMonth()+1;
    var dy = dt.getDate();
    var hr = dt.getHours();
    var m = "0" + dt.getMinutes();
    var s = "0" + dt.getSeconds();
    return dy+'/'+mt+'/'+yr+':'+ hr+ ':' + m.substr(-2) + ':' + s.substr(-2);  
    }
    


}
