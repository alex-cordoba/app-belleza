import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificarTelPageRoutingModule } from './verificar-tel-routing.module';

import { VerificarTelPage } from './verificar-tel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificarTelPageRoutingModule
  ],
  declarations: [VerificarTelPage]
})
export class VerificarTelPageModule {}
