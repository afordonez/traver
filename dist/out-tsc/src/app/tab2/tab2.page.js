import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ViajesService } from '../servicios/viajes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { HereService } from '../servicios/here.service';
import { CompleterService } from 'ng2-completer';
import { ModalResumenPage } from '../modal/modal-resumen/modal-resumen.page';
import { ModalController } from '@ionic/angular';
var Tab2Page = /** @class */ (function () {
    //private location: string;
    function Tab2Page(formBuilder, viajeS, router, loadingController, fb, hereS, completer, activeRoute, modalController) {
        this.formBuilder = formBuilder;
        this.viajeS = viajeS;
        this.router = router;
        this.loadingController = loadingController;
        this.fb = fb;
        this.hereS = hereS;
        this.completer = completer;
        this.activeRoute = activeRoute;
        this.modalController = modalController;
        this.ubicaciones = [];
        this.contador = 0;
        this.id = null;
        // private ubi:Location;
        this.miarray = [];
        this.viaje = this.fb.group({
            conductor: ['', [Validators.required]],
            origen: ['', [Validators.required]],
            destino: ['', [Validators.required]],
            ganancia: ['', [Validators.required]],
            realizado: ['', [Validators.required]],
            fecha: ['', [Validators.required]]
        });
        //this.dataService = completer.local(this.hereS.autoCompleteLocation2(this.searchStr));
    }
    Tab2Page.prototype.ngOnInit = function () {
        console.log("He llegado a tab2");
        if (this.activeRoute.snapshot.paramMap.get('id')) {
            this.id = this.activeRoute.snapshot.paramMap.get('id');
            console.log(this.id);
            this.buscaViaje(this.id);
        }
    };
    Tab2Page.prototype.ionViewDidEnter = function () {
    };
    Tab2Page.prototype.gestionaViaje = function () {
        if (this.id == null) {
            console.log("Nuevo");
            this.nuevoViaje();
        }
        else if (this.id != null) {
            console.log("Actualizo");
            this.actualizaViaje(this.id);
        }
    };
    Tab2Page.prototype.nuevoViaje = function () {
        var _this = this;
        this.presentLoading('Buscando LocIdOrigen');
        var locIdOrigen;
        var locIdDestino;
        this.hereS.autoCompleteLocation2(this.viaje.get("origen").value)
            .subscribe(function (ciudades) {
            ciudades.forEach(function (ciudad) {
                if (ciudad.location == _this.viaje.get("origen").value) {
                    locIdOrigen = ciudad.locationId;
                    _this.loadingController.dismiss();
                    _this.presentLoading('Buscando LocIdDestino');
                    _this.hereS.autoCompleteLocation2(_this.viaje.get("destino").value)
                        .subscribe(function (ciudades) {
                        ciudades.forEach(function (ciudad) {
                            if (ciudad.location == _this.viaje.get("destino").value) {
                                locIdDestino = ciudad.locationId;
                                _this.loadingController.dismiss();
                                _this.presentLoading('Guardando');
                                var viajeAux = {
                                    conductor: _this.viaje.get("conductor").value,
                                    origen: _this.viaje.get("origen").value,
                                    destino: _this.viaje.get("destino").value,
                                    ganancia: _this.viaje.get("ganancia").value,
                                    realizado: false,
                                    fecha: new Date(_this.viaje.get("fecha").value),
                                    locIdOrigen: locIdOrigen,
                                    locIdDestino: locIdDestino
                                };
                                //this.miarray = null;
                                if (Object.entries(viajeAux).values != null) {
                                    _this.viajeS.agregaViaje(viajeAux)
                                        .then(function (viajeRef) {
                                        _this.viaje.setValue({
                                            conductor: (''),
                                            origen: (''),
                                            destino: (''),
                                            ganancia: (''),
                                            realizado: (''),
                                            fecha: ('')
                                        });
                                        console.log("Referencia del viaje: ", viajeRef.id);
                                        console.log("He creado un viaje nuevo");
                                        _this.loadingController.dismiss();
                                        _this.generaResumen(viajeRef.id);
                                    })
                                        .catch(function (error) {
                                        console.error("Error insertando el documento", error);
                                        _this.loadingController.dismiss();
                                    });
                                }
                                else {
                                    console.log("Objeto nulo");
                                }
                            }
                        });
                    });
                }
            });
        });
    };
    Tab2Page.prototype.actualizaViaje = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var viaje;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.presentLoading('Actualizando');
                viaje = {
                    conductor: this.viaje.get('conductor').value,
                    origen: this.viaje.get("origen").value,
                    destino: this.viaje.get("destino").value,
                    ganancia: this.viaje.get("ganancia").value,
                    realizado: false,
                    fecha: this.viaje.get("fecha").value
                };
                if (Object.entries(viaje).values != null) {
                    this.viajeS.actualizaViaje(id, viaje)
                        .then(function () {
                        _this.viaje.setValue({
                            conductor: (''),
                            origen: (''),
                            destino: (''),
                            ganancia: (''),
                            realizado: (''),
                            fecha: ('')
                        });
                        console.log("Viaje actualizado");
                        _this.loadingController.dismiss();
                        _this.generaResumen(id);
                    }).catch(function (error) {
                        console.error("Error insertando documento");
                        _this.loadingController.dismiss();
                    });
                }
                else {
                    console.log("Objeto nulo");
                }
                return [2 /*return*/];
            });
        });
    };
    Tab2Page.prototype.buscaViaje = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.presentLoading("Cargando");
                this.viajeS.leeViaje(id)
                    .subscribe(function (viaje) {
                    _this.miViaje = tslib_1.__assign({ id: viaje.id }, viaje.data());
                    _this.viaje.get('conductor').setValue(_this.miViaje.conductor);
                    _this.viaje.get('origen').setValue(_this.miViaje.origen);
                    _this.viaje.get('destino').setValue(_this.miViaje.destino);
                    _this.viaje.get('ganancia').setValue(_this.miViaje.ganancia);
                    _this.viaje.get('realizado').setValue(_this.miViaje.realizado);
                    _this.viaje.get('fecha').setValue('123');
                    //console.log("Estoy llegando hasta aquí!!!");
                    _this.loadingController.dismiss();
                });
                return [2 /*return*/];
            });
        });
    };
    Tab2Page.prototype.generaResumen = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Has hecho click en un item y este es su id: ", id);
                        return [4 /*yield*/, this.modalController.create({
                                component: ModalResumenPage,
                                componentProps: {
                                    id: id
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
    Tab2Page.prototype.Unix_timestamp = function (t) {
        var dt = new Date(t * 1000);
        var yr = dt.getFullYear();
        var mt = dt.getMonth() + 1;
        var dy = dt.getDate();
        var hr = dt.getHours();
        var m = "0" + dt.getMinutes();
        var s = "0" + dt.getSeconds();
        return dy + '/' + mt + '/' + yr + ':' + hr + ':' + m.substr(-2) + ':' + s.substr(-2);
    };
    Tab2Page.prototype.presentLoading = function (msg) {
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
    Tab2Page.prototype.presentUbi = function (ubi) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.hereS.autoCompleteLocation2(ubi)
                    .subscribe(function (ciudades) {
                    //console.log(miarray)
                    console.log(ciudades);
                    ciudades.forEach(function (ciudad) {
                        console.log(ciudad.locationId);
                        /*let location:string = ciudad.location;
                        this.locId = ciudad.locationId;
                        let ubicacion: Location = {location: location,locationId: this.locId};
                        this.miarray.push(ubicacion);
                        this.miarray*/
                    });
                    _this.dataService = _this.completer.local(ciudades, 'location', 'location');
                });
                return [2 /*return*/];
            });
        });
    };
    Tab2Page.prototype.devuelveDocID = function (ubi) {
        /*.subscribe(ciudades=>{
          ciudades.forEach(ciudad => {
            if(ciudad.location==ubi){
            let ubicacion: Location = {location: ciudad.location,locationId: ciudad.locationId};
            this.miarray.push(ubicacion);
              
            }
          });
        })*/
    };
    Tab2Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab2',
            templateUrl: 'tab2.page.html',
            styleUrls: ['tab2.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder,
            ViajesService,
            Router,
            LoadingController,
            FormBuilder,
            HereService,
            CompleterService,
            ActivatedRoute,
            ModalController])
    ], Tab2Page);
    return Tab2Page;
}());
export { Tab2Page };
//# sourceMappingURL=tab2.page.js.map