import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerificarTelPage } from './verificar-tel.page';

const routes: Routes = [
  {
    path: '',
    component: VerificarTelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificarTelPageRoutingModule {}
