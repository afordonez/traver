import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
var HereService = /** @class */ (function () {
    function HereService(http) {
        this.http = http;
    }
    HereService.prototype.getLocation = function (query) {
        console.log(environment.hereEndPoints.autocomplete + query);
        return this.http.get(environment.hereEndPoints.autocomplete + query);
    };
    HereService.prototype.getPosition = function (query) {
        console.log(environment.hereEndPoints.geocode + query);
        return this.http.get(environment.hereEndPoints.geocode + query);
    };
    HereService.prototype.getRoute = function (latitudeOr, longitudeOr, latitudeDes, longitudeDes) {
        console.log('https://route.api.here.com/routing/7.2/calculateroute.json?app_id=uxEmAglbkQRXQFGglvhp&app_code=GnYqSMaK2w87b5S-4a-PXQ&mode=fastest;car;traffic:disabled&waypoint0=geo!' + latitudeOr + ',' + longitudeOr + '&waypoint1=geo!' + latitudeDes + ',' + longitudeDes + '');
        return this.http.get('https://route.api.here.com/routing/7.2/calculateroute.json?app_id=uxEmAglbkQRXQFGglvhp&app_code=GnYqSMaK2w87b5S-4a-PXQ&mode=fastest;car;traffic:disabled&waypoint0=geo!' + latitudeOr + ',' + longitudeOr + '&waypoint1=geo!' + latitudeDes + ',' + longitudeDes + '');
    };
    //callable from your page. Resolve the promise when info available, catch if error
    HereService.prototype.autoCompleteLocation = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getLocation(query)
                .pipe(map(function (x) { return x.suggestions; }))
                .subscribe(function (json) {
                //tengo un array de objetos
                var jsonmodificado = json.filter(function (ciudad) { return ciudad.matchLevel == "city"; });
                var label = jsonmodificado.map(function (ciudad) { return ciudad.label; });
                console.log(label);
                resolve(label);
            });
        });
    };
    HereService.prototype.autoCompleteLocation2 = function (query) {
        console.log(query);
        return this.getLocation(query)
            .pipe(map(function (x) { return x.suggestions; }), map(function (memberArray) { return memberArray.filter(function (t) {
            return t.matchLevel == "city" || t.matchLevel == "district";
        }); }), map(function (entradas) {
            console.log(entradas);
            var miarray = [];
            for (var j = 0; j < entradas.length; j++) {
                var ubicacion = {
                    location: entradas[j].label,
                    locationId: entradas[j].locationId
                };
                //miarray.push(entradas[j].label)
                miarray.push(ubicacion);
            }
            console.log(miarray);
            return miarray;
        }));
    };
    HereService.prototype.geocoding = function (query) {
        var latitude;
        var longitude;
        return this.getPosition(query)
            .pipe(map(function (x) { return x.response; }), map(function (x) { return x.view; }), map(function (memberArray) { return memberArray.map(function (x) { return x.result.map(function (x) { return x.location.displayPosition; }); }); }));
    };
    HereService.prototype.route = function (latitudeOr, longitudeOr, latitudeDes, longitudeDes) {
        return this.getRoute(latitudeOr, longitudeOr, latitudeDes, longitudeDes)
            .pipe(map(function (x) { return x.response; }), map(function (x) { return x.route; }));
    };
    HereService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], HereService);
    return HereService;
}());
export { HereService };
//# sourceMappingURL=here.service.js.map