import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ModalResumenPage } from './modal-resumen.page';
var routes = [
    {
        path: '',
        component: ModalResumenPage
    }
];
var ModalResumenPageModule = /** @class */ (function () {
    function ModalResumenPageModule() {
    }
    ModalResumenPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ModalResumenPage]
        })
    ], ModalResumenPageModule);
    return ModalResumenPageModule;
}());
export { ModalResumenPageModule };
//# sourceMappingURL=modal-resumen.module.js.map