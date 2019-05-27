import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ViajesService } from '../servicios/viajes.service';
import { Router } from '@angular/router';
import{LoadingController} from'@ionic/angular';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  viaje: FormGroup; //Instancia de FormGroup en tab2.page.html
  
  constructor(
    private formBuilder: FormBuilder,
    private viajeS: ViajesService,
    private router: Router,
    public loadingController: LoadingController,
    public fb: FormBuilder
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
  }

  nuevoViaje(){
    this.presentLoading('Guardando');
    let viaje={
      conductor: this.viaje.get("conductor").value,
      origen: this.viaje.get("origen").value,
      destino: this.viaje.get("destino").value,
      ganancia: this.viaje.get("ganancia").value,
      realizado: this.viaje.get("realizado").value,
      fecha: new Date(this.viaje.get("fecha").value)
    }
    if(Object.entries(viaje).values!=null){
      this.viajeS.agregaViaje(viaje)
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
     this.loadingController.dismiss();
  
      })
      .catch((error)=>{
        console.error("Error insertando el documento",error);
        this.loadingController.dismiss();
      })
    }
    else{
      console.log("Objeto nulo");
    }
    
    
  }

  async presentLoading(msg) {
    const myloading = await this.loadingController.create({
      message: msg
    });
    return await myloading.present()
    ; }

}
