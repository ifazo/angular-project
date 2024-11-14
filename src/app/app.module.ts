import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { initializeApp } from 'firebase/app';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ToastModule } from 'primeng/toast';
import { StoreModule } from '@ngrx/store';
import { cartReducer } from './stores/cart/cart.reducer';
import { provideHttpClient, withFetch } from '@angular/common/http';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, AppComponent, ToastModule,  StoreModule.forRoot({ cart: cartReducer })],
  providers: [ provideHttpClient(withFetch())],
})

export class AppModule {
  constructor() {
    initializeApp(environment.firebaseConfig);
  }
}
