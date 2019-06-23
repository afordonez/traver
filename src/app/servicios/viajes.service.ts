import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {environment} from '../../environments/environment';
import {Viaje} from '../model/viaje';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ViajesService {
  // tslint:disable-next-line:no-trailing-whitespace
  
  myCollection: AngularFirestoreCollection<any>;

  constructor(private fireStore: AngularFirestore) {
    this.myCollection = fireStore.collection<any>(environment.firebaseConfig.viajeColeccion);
  }

  agregaViaje(nuevoViaje) {
    return this.myCollection.add(nuevoViaje);
  }
  leeTodosViajes(): Observable<any> {
    return this.myCollection.get();
  }
  /*Lee la lista completa de viajes en firebase*/
  leeViajesNoRealizadosDesde(): Promise<any> {
    return this.myCollection.ref.where('realizado', '==', false).get();
  }
  leeViajesNoRealizadosCada10DesdeElInicio(): Promise<any> {
    return this.myCollection.ref.where('realizado', '==', false).orderBy('origen').limit(8).get();
  }
  leeViajesNoRealizadosCada10DesdeElUltimoLeido(ultimo:any): Promise<any> {
    return this.myCollection.ref.where('realizado', '==', false).orderBy('origen').startAfter(ultimo).limit(10).get();
  }


  /*Lee un viaje concreto de firebase*/
  leeViaje(id): Observable<any> {
    return this.myCollection.doc(id).get();
  }
  //Actualiza un viaje
  actualizaViaje(id: string, viaje) {
    return this.myCollection.doc(id).update(viaje);

  }
  leeViajeSegunCriterio() {

  }
  borraViaje(id) {
    return this.myCollection.doc(id).delete();
  }

}
