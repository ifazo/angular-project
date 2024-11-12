// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { initializeApp } from 'firebase/app';
import { AppComponent } from './app.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  imports: [BrowserModule, AppComponent, ToastModule],
  providers: [MessageService],
})
export class AppModule {
  constructor(private messageService: MessageService) {
    initializeApp(environment.firebaseConfig);
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Message content',
    });
  }
}
