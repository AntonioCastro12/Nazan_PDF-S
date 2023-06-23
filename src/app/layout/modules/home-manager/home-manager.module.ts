import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeManagerRoutingModule } from './home-manager-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeManagerRoutingModule,
  ],
  providers: [
    HomePageComponent
  ]
})
export class HomeManagerModule { }
