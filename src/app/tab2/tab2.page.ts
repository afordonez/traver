import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ViajesService } from '../servicios/viajes.service';
import { Router, ActivatedRoute } from '@angular/router';
import{LoadingController, NavDelegate} from'@ionic/angular';
import { HereService } from '../servicios/here.service';
import { CompleterService, CompleterData } from 'ng2-completer';
//import { observable, Observable } from 'types/rxjs';
import { observable, Observable } from 'rxjs';
import { map, toArray } from 'rxjs/operators';
import {Location} from'../model/ubicaciones';
import {Viaje}from'../model/viaje';
import { ModalResumenPage } from '../modal/modal-resumen/modal-resumen.page';
import {ModalController} from '@ionic/angular';
import { strict } from 'assert';
import { stringify } from '@angular/core/src/render3/util';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  
  viaje: FormGroup; //Instancia de FormGroup en tab2.page.html
  protected dataService: CompleterData;
  public searchStrOr: string;
  public searchStrDes: string;
  protected ubicaciones:Location[]=[];
  private contador:number = 0;
  private id = null;
  private miViaje: Viaje;
  private i:number;
 // private ubi:Location;
  private  miarray:Location[]=[];
  private  locId: string;
  //private location: string;




  

  
  constructor(
    private formBuilder: FormBuilder,
    private viajeS: ViajesService,
    private router: Router,
    public loadingController: LoadingController,
    public fb: FormBuilder,
    public hereS:HereService,
    private completer: CompleterService,
    private activeRoute: ActivatedRoute,
    public modalController: ModalController,

    
    )
    
    {
      this.viaje = this.fb.group({
        conductor:['',[Validators.required]],
        origen:['',[Validators.required]],
        destino:['',[Validators.required]],
        ganancia:['',[Validators.required]],
        realizado:['',[Validators.required]],
        fecha:['',[Validators.required]]
      });
      //this.dataService = completer.local(this.hereS.autoCompleteLocation2(this.searchStr));
      
      
  }
  ngOnInit() {
    console.log("He llegado a tab2");
      if(this.activeRoute.snapshot.paramMap.get('id')){
        this.id = this.activeRoute.snapshot.paramMap.get('id');
        console.log(this.id);
        this.buscaViaje(this.id);
      }
  }
  
  ionViewDidEnter() {
    
    

  }

  gestionaViaje(){
    if(this.id==null){
      console.log("Nuevo");
      this.nuevoViaje();
      
    }else if(this.id!=null){
      console.log("Actualizo");
      this.actualizaViaje(this.id);
    }
  }

  
  nuevoViaje(){
   
    this.presentLoading('Buscando LocIdOrigen');
    let locIdOrigen;
    let locIdDestino;
    this.hereS.autoCompleteLocation2(this.viaje.get("origen").value)
    
     .subscribe(ciudades=>{
        ciudades.forEach(ciudad => {
          if(ciudad.location == this.viaje.get("origen").value ){
           locIdOrigen=ciudad.locationId;
           this.loadingController.dismiss();
           this.presentLoading('Buscando LocIdDestino')
           this.hereS.autoCompleteLocation2(this.viaje.get("destino").value)
          .subscribe(ciudades=>{
             ciudades.forEach(ciudad => {
               if(ciudad.location == this.viaje.get("destino").value ){
                locIdDestino=ciudad.locationId;
                this.loadingController.dismiss();
                this.presentLoading('Guardando')
                let viajeAux={
                  conductor: this.viaje.get("conductor").value,
                  origen: this.viaje.get("origen").value,
                  destino: this.viaje.get("destino").value,
                  ganancia: this.viaje.get("ganancia").value,
                  realizado: false,
                  fecha: new Date(this.viaje.get("fecha").value),
                  locIdOrigen: locIdOrigen,
                  locIdDestino: locIdDestino
                  
                }
                //this.miarray = null;
                if(Object.entries(viajeAux).values!=null){
                  this.viajeS.agregaViaje(viajeAux)
                  .then((viajeRef)=>{
                  this.viaje.setValue({
                    conductor:(''),
                    origen:(''),
                    destino:(''),
                    ganancia:(''),
                    realizado:(''),
                    fecha:('')
                  });
                  console.log("Referencia del viaje: ",viajeRef.id);
                  console.log("He creado un viaje nuevo");
                 this.loadingController.dismiss();
                 this.generaResumen(viajeRef.id);
              
                  })
                  .catch((error)=>{
                    console.error("Error insertando el documento",error);
                    this.loadingController.dismiss();
                  })
                }
                else{
                  console.log("Objeto nulo");
                }
               }else{
                 this.loadingController.dismiss();
               }
             });
           })
          }
        });
      })
      
     
    
    
  }

  async actualizaViaje(id: string){
    this.presentLoading('Actualizando');
    let viaje={
      conductor: this.viaje.get('conductor').value,
      origen: this.viaje.get("origen").value,
      destino: this.viaje.get("destino").value,
      ganancia: this.viaje.get("ganancia").value,
      realizado: false,
      fecha: this.viaje.get("fecha").value
      
    }
    if(Object.entries(viaje).values!=null){
      this.viajeS.actualizaViaje(id, viaje)
      .then(()=>{
        this.viaje.setValue({
          conductor:(''),
          origen:(''),
          destino:(''),
          ganancia:(''),
          realizado:(''),
          fecha:('')
        });
        console.log("Viaje actualizado");
        this.loadingController.dismiss();
        this.generaResumen(id);

      }).catch((error)=>{
        console.error("Error insertando documento");
        this.loadingController.dismiss();
      })  
    }else{
      console.log("Objeto nulo");
    }
  }

  async buscaViaje(id){
    this.presentLoading("Cargando");
    this.viajeS.leeViaje(id)
    .subscribe((viaje)=>{
      this.miViaje = {id: viaje.id, ...viaje.data()};
      this.viaje.get('conductor').setValue(this.miViaje.conductor);
      this.viaje.get('origen').setValue(this.miViaje.origen);
      this.viaje.get('destino').setValue(this.miViaje.destino);
      this.viaje.get('ganancia').setValue(this.miViaje.ganancia);
      this.viaje.get('realizado').setValue(this.miViaje.realizado);
      this.viaje.get('fecha').setValue('123');
      //console.log("Estoy llegando hasta aquí!!!");
      this.loadingController.dismiss();
      })
      
    
    
  }

  
  async generaResumen(id){
    console.log("Has hecho click en un item y este es su id: ",id);
    const modal = await this.modalController.create({
      component: ModalResumenPage,
      componentProps: { 
        id: id
       }
    });
    return await modal.present();
  }

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

  async presentLoading(msg) {
    const myloading = await this.loadingController.create({
      message: msg
    });
    return await myloading.present()
    ; }

    async presentUbi(ubi: string){
    this.hereS.autoCompleteLocation2(ubi)
    
    .subscribe(ciudades =>{
      //console.log(miarray)
      console.log(ciudades)
      ciudades.forEach(ciudad => {
        console.log(ciudad.locationId)
        /*let location:string = ciudad.location;
        this.locId = ciudad.locationId;
        let ubicacion: Location = {location: location,locationId: this.locId};
        this.miarray.push(ubicacion);
        this.miarray*/
        
      });
      this.dataService = this.completer.local(ciudades, 'location', 'location');
    })

    
    
  }
  devuelveDocID(ubi: string){
    
     
    /*.subscribe(ciudades=>{
      ciudades.forEach(ciudad => {
        if(ciudad.location==ubi){
        let ubicacion: Location = {location: ciudad.location,locationId: ciudad.locationId};
        this.miarray.push(ubicacion);
          
        }
      });
    })*/
  }

  
  
 
  

}
