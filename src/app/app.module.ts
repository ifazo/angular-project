import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { initializeApp } from 'firebase/app';
import { AppComponent } from './app.component';
import { ToastModule } from 'primeng/toast';

@NgModule({
  imports: [BrowserModule, AppComponent, ToastModule],
  providers: [],
})

export class AppModule {
  constructor() {
    initializeApp(environment.firebaseConfig);
  }
}
