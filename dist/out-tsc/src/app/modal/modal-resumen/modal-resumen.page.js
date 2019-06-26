import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { ViajesService } from '../../servicios/viajes.service';
import { HereService } from '../../servicios/here.service';
import { Map } from 'leaflet';
var ModalResumenPage = /** @class */ (function () {
    function ModalResumenPage(modalCrl, viajeS, hereS, loadingController) {
        this.modalCrl = modalCrl;
        this.viajeS = viajeS;
        this.hereS = hereS;
        this.loadingController = loadingController;
    }
    ModalResumenPage.prototype.ngOnInit = function () {
        var _this = this;
        console.log(this.id);
        //this.recuperaViaje(this.id);
        this.presentLoading("Cargando");
        this.viajeS.leeViaje(this.id)
            .subscribe(function (consulta) {
            _this.viaje = tslib_1.__assign({ id: consulta.id }, consulta.data());
            _this.loadingController.dismiss();
            var latitudeOr;
            var longitudeOr;
            var latitudeDes;
            var longitudeDes;
            var distance;
            _this.hereS.geocoding(_this.viaje.locIdOrigen)
                .subscribe(function (json) {
                console.log(json);
                latitudeOr = json["0"]["0"].latitude;
                longitudeOr = json["0"]["0"].longitude;
                console.log("Latitude " + latitudeOr);
                console.log("Longitude " + longitudeOr);
                _this.hereS.geocoding(_this.viaje.locIdDestino)
                    .subscribe(function (json) {
                    latitudeDes = json["0"]["0"].latitude;
                    longitudeDes = json["0"]["0"].longitude;
                    console.log("Latitude " + latitudeDes);
                    console.log("Longitude " + longitudeDes);
                    _this.hereS.route(latitudeOr, longitudeOr, latitudeDes, longitudeDes)
                        .subscribe(function (json) {
                        //console.log("Distancia: "+json.response.route["0"].sumary.distance);
                        //console.log(json["0"].summary.distance);
                        distance = ((json["0"].summary.distance) / 1000);
                        console.log("La distancia en kilómetros es: " + distance);
                        var viaje = {
                            id: _this.viaje.id,
                            conductor: _this.viaje.conductor,
                            fecha: _this.viaje.fecha,
                            ganancia: _this.viaje.ganancia,
                            origen: _this.viaje.origen,
                            destino: _this.viaje.destino,
                            realizado: _this.viaje.realizado,
                            locIdOrigen: _this.viaje.locIdOrigen,
                            locIdDestino: _this.viaje.locIdDestino,
                            latitudeOr: latitudeOr,
                            longitudeOr: longitudeOr,
                            latitudeDes: latitudeDes,
                            longitudeDes: longitudeDes,
                            distance: distance
                        };
                        _this.viajeS.actualizaViaje(viaje.id, viaje)
                            .then(function () {
                            console.log("viaje actualizado");
                            _this.viajeS.leeViaje(viaje.id)
                                .subscribe(function (consulta) {
                                _this.viaje = tslib_1.__assign({ id: consulta.id }, consulta.data());
                                console.log(_this.viaje.conductor);
                                console.log(_this.viaje.distance);
                            });
                        })
                            .catch(function () {
                            console.log("Error actualizando el viaje");
                        });
                        //this.viajeS.actualizaViaje()
                    });
                });
            });
        });
        this.map = new Map('mapid').setView([51.505, -0.09], 13);
    };
    ModalResumenPage.prototype.recuperaViaje = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    ModalResumenPage.prototype.presentLoading = function (msg) {
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
    ModalResumenPage = tslib_1.__decorate([
        Component({
            selector: 'app-modal-resumen',
            templateUrl: './modal-resumen.page.html',
            styleUrls: ['./modal-resumen.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController,
            ViajesService,
            HereService,
            LoadingController])
    ], ModalResumenPage);
    return ModalResumenPage;
}());
export { ModalResumenPage };
//# sourceMappingURL=modal-resumen.page.js.map