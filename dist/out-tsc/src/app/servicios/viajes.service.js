import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from '../../environments/environment';
var ViajesService = /** @class */ (function () {
    function ViajesService(fireStore) {
        this.fireStore = fireStore;
        this.myCollection = fireStore.collection(environment.firebaseConfig.viajeColeccion);
    }
    ViajesService.prototype.agregaViaje = function (nuevoViaje) {
        return this.myCollection.add(nuevoViaje);
    };
    ViajesService.prototype.leeTodosViajes = function () {
        return this.myCollection.get();
    };
    /*Lee la lista completa de viajes en firebase*/
    ViajesService.prototype.leeViajesNoRealizadosDesde = function () {
        return this.myCollection.ref.where('realizado', '==', false).get();
    };
    ViajesService.prototype.leeViajesNoRealizadosCada10DesdeElInicio = function () {
        return this.myCollection.ref.where('realizado', '==', false).orderBy('origen').limit(8).get();
    };
    ViajesService.prototype.leeViajesNoRealizadosCada10DesdeElUltimoLeido = function (ultimo) {
        return this.myCollection.ref.where('realizado', '==', false).orderBy('origen').startAfter(ultimo).limit(10).get();
    };
    /*Lee un viaje concreto de firebase*/
    ViajesService.prototype.leeViaje = function (id) {
        return this.myCollection.doc(id).get();
    };
    //Actualiza un viaje
    ViajesService.prototype.actualizaViaje = function (id, viaje) {
        return this.myCollection.doc(id).update(viaje);
    };
    ViajesService.prototype.leeViajeSegunCriterio = function () {
    };
    ViajesService.prototype.borraViaje = function (id) {
        return this.myCollection.doc(id).delete();
    };
    ViajesService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFirestore])
    ], ViajesService);
    return ViajesService;
}());
export { ViajesService };
//# sourceMappingURL=viajes.service.js.map