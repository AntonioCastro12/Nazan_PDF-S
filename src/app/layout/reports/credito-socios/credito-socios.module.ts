import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditoSociosRoutingModule } from './credito-socios-routing.module';
import { CreditoSociosComponent } from './credito-socios.component';


@NgModule({
  declarations: [
    CreditoSociosComponent
  ],
  imports: [
    CommonModule,
    CreditoSociosRoutingModule
  ]
})
export class CreditoSociosModule { }
