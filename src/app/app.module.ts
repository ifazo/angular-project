// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { initializeApp } from 'firebase/app';
import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, AppComponent],
  providers: []
})
export class AppModule {
  constructor() {
    // Initialize Firebase with the environment configuration
    initializeApp(environment.firebaseConfig);
  }
}
