import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { initializeApp } from 'firebase/app';
import { AppComponent } from './app.component';
import { ToastModule } from 'primeng/toast';

import { StoreModule } from '@ngrx/store';
import { cartReducer } from './stores/cart/cart.reducer';

@NgModule({
  imports: [BrowserModule, AppComponent, ToastModule,  StoreModule.forRoot({ cart: cartReducer })],
  providers: [],
})

export class AppModule {
  constructor() {
    initializeApp(environment.firebaseConfig);
  }
}
