import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'modal', loadChildren: './modal/modal/modal.module#ModalPageModule' },
  { path: 'modal-resumen', loadChildren: './modal/modal-resumen/modal-resumen.module#ModalResumenPageModule' },
  { path:'tab1', loadChildren:'./tab1/tab1.module#Tab1PageModule'},
  { path: 'tab2/:id',loadChildren:'./tab2/tab2.module#Tab2PageModule'}
  
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
