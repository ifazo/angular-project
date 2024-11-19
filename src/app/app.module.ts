import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { initializeApp } from 'firebase/app';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ToastModule } from 'primeng/toast';
import { StoreModule } from '@ngrx/store';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './stores/reducers';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppComponent,
    ToastModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
      autoPause: true,
      features: {
        pause: false,
        lock: true,
        persist: true,
      },
    }),
  ],
  providers: [provideHttpClient(withFetch())],
})
export class AppModule {
  constructor() {
    initializeApp(environment.firebaseConfig);
  }
}
