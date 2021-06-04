import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './../../components/home/home.component';
import { DevelopmentComponent } from 'src/app/components/development/development.component';
import { MissionVisionComponent } from 'src/app/components/mission-vision/mission-vision.component';
import { ProductsComponent } from 'src/app/components/products/products.component';
import { ContactComponent } from 'src/app/components/contact/contact.component';



@NgModule({
  declarations: [
    HomeComponent,
    ProductsComponent,
    DevelopmentComponent,
    MissionVisionComponent,
    ContactComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
