import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './scenes/home/home.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { HomeModule } from './scenes';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
