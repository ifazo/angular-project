import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { provideState, provideStore } from '@ngrx/store';
import { cartReducer } from './stores/cart/cart.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { userReducer } from './stores/user/user.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    provideAnimations(),
    provideAnimationsAsync(),
    provideStore(),
    provideState({ name: 'cart', reducer: cartReducer }),
    provideState({ name: 'user', reducer: userReducer }),
    importProvidersFrom(ToastModule),
    { provide: MessageService, useClass: MessageService },
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
],
};
