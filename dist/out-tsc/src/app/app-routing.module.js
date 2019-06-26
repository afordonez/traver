import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
var routes = [
    { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
    { path: 'modal', loadChildren: './modal/modal/modal.module#ModalPageModule' },
    { path: 'modal-resumen', loadChildren: './modal/modal-resumen/modal-resumen.module#ModalResumenPageModule' },
    { path: 'tab1', loadChildren: './tab1/tab1.module#Tab1PageModule' },
    { path: 'tab2/:id', loadChildren: './tab2/tab2.module#Tab2PageModule' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
            ],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map