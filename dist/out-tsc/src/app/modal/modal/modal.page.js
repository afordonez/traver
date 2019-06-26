import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
var ModalPage = /** @class */ (function () {
    function ModalPage(navParams, modalCtrl) {
        this.modalCtrl = modalCtrl;
    }
    ModalPage.prototype.ngOnInit = function () {
        console.log(this.conductor);
        console.log(this.fecha.seconds);
        console.log(this.Unix_timestamp(this.fecha.seconds));
    };
    ModalPage.prototype.closeModal = function () {
        this.modalCtrl.dismiss();
    };
    ModalPage.prototype.Unix_timestamp = function (t) {
        var dt = new Date(t * 1000);
        var yr = dt.getFullYear();
        var mt = dt.getMonth() + 1;
        var dy = dt.getDate();
        var hr = dt.getHours();
        var m = "0" + dt.getMinutes();
        var s = "0" + dt.getSeconds();
        return dy + '/' + mt + '/' + yr + ':' + hr + ':' + m.substr(-2) + ':' + s.substr(-2);
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], ModalPage.prototype, "value", void 0);
    ModalPage = tslib_1.__decorate([
        Component({
            selector: 'app-modal',
            templateUrl: './modal.page.html',
            styleUrls: ['./modal.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavParams, ModalController])
    ], ModalPage);
    return ModalPage;
}());
export { ModalPage };
//# sourceMappingURL=modal.page.js.map