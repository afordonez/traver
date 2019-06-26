import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll, IonVirtualScroll, NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ViajesService } from '../servicios/viajes.service';
import { AlertController } from '@ionic/angular';
import { ModalPage } from '../modal/modal/modal.page';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
var Tab1Page = /** @class */ (function () {
    //i = 0;
    function Tab1Page(viajes, loadingController, alertController, modalController, router, navController) {
        /* this.dataList = [];
         for (this.i = 0; this.i < 50; this.i++) {
           let viajeFicticio:Viaje={id:this.i,origen:"Origen"+this.i,destino:"Destino"+this.i,conductor:"driver",coste:this.i,realizado:true}
           this.dataList.push(viajeFicticio);
         }*/
        this.viajes = viajes;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.modalController = modalController;
        this.router = router;
        this.navController = navController;
    }
    Tab1Page.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.presentLoading('Cargando');
        this.viajes.leeViajesNoRealizadosCada10DesdeElInicio()
            .then(function (querySnapshot) {
            _this.dataList = [];
            querySnapshot.forEach(function (doc) {
                console.log(doc.id);
                //console.log(doc.data());
                var temporal = tslib_1.__assign({ id: doc.id }, doc.data());
                _this.dataList.push(tslib_1.__assign({ id: doc.id }, doc.data()));
                _this.ultimoViaje = doc;
                console.log(_this.ultimoViaje.data());
            });
            _this.dataListPanel = _this.dataList;
            // this.dataListPanel= this.dataList;
            _this.loadingController.dismiss();
        });
    };
    Tab1Page.prototype.cargaMasViajes = function (event) {
        var _this = this;
        console.log("carga");
        console.log(this.ultimoViaje.data());
        this.viajes.leeViajesNoRealizadosCada10DesdeElUltimoLeido(this.ultimoViaje)
            .then(function (querySnapshot) {
            //console.log(querySnapshot);
            querySnapshot.forEach(function (doc) {
                _this.dataList.push(tslib_1.__assign({ id: doc.id }, doc.data()));
                _this.ultimoViaje = doc;
                console.log(_this.ultimoViaje.data());
                _this.dataListPanel = _this.dataList;
            });
            //console.log(this.dataListPanel.length);
            //let contador:number = 15;
            //console.log(this.dataList[this.i])  
            console.log("Aquí estoy entrando");
            event.target.complete();
        });
        // this.infiniteScroll.complete;
    };
    Tab1Page.prototype.presentLoading = function (msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var myloading;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create({
                            message: msg
                        })];
                    case 1:
                        myloading = _a.sent();
                        return [4 /*yield*/, myloading.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /*  async presentModal() {
        const modal = await this.modalController.create({
          component: ModalPage,
          // componentProps: {value: 1}
        });
        return await modal.present();
      }*/
    Tab1Page.prototype.presentAlertConfirm = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Editar, Eliminar',
                            message: '<p style="color:black;">Selecciona editar, o eliminar.</p>',
                            buttons: [
                                {
                                    text: 'Editar',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        //console.log('No lo elimino');
                                        _this.router.navigate(['/tab2', id]);
                                        //this.navController.navigateForward(['/tab2', id]);
                                    }
                                }, {
                                    text: 'Eliminar',
                                    handler: function () {
                                        //console.log('Confirm Okay');
                                        _this.eliminaViaje(id);
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Tab1Page.prototype.eliminaViaje = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                console.log(id);
                this.presentLoading('Eliminando');
                this.viajes.borraViaje(id)
                    .then(function () {
                    console.log('El viaje se ha eliminado correctamente');
                    _this.loadingController.dismiss();
                })
                    .catch(function () {
                    console.error('Error eliminando el viaje');
                });
                return [2 /*return*/];
            });
        });
    };
    Tab1Page.prototype.escribe = function (item) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Has hecho click en un item y este es su id: ", item.id, "Conductor: ", item.conductor);
                        return [4 /*yield*/, this.modalController.create({
                                component: ModalPage,
                                componentProps: {
                                    conductor: item.conductor,
                                    origen: item.origen,
                                    destino: item.destino,
                                    ganancia: item.ganancia,
                                    fecha: item.fecha
                                }
                            })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    tslib_1.__decorate([
        ViewChild('dynamicList'),
        tslib_1.__metadata("design:type", Object)
    ], Tab1Page.prototype, "dynamicList", void 0);
    tslib_1.__decorate([
        ViewChild('is'),
        tslib_1.__metadata("design:type", IonInfiniteScroll)
    ], Tab1Page.prototype, "infiniteScroll", void 0);
    tslib_1.__decorate([
        ViewChild(IonVirtualScroll),
        tslib_1.__metadata("design:type", IonVirtualScroll)
    ], Tab1Page.prototype, "virtualScroll", void 0);
    Tab1Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab1',
            templateUrl: 'tab1.page.html',
            styleUrls: ['tab1.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ViajesService,
            LoadingController,
            AlertController,
            ModalController,
            Router,
            NavController])
    ], Tab1Page);
    return Tab1Page;
}());
export { Tab1Page };
//# sourceMappingURL=tab1.page.js.map