import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideTranslateService, provideTranslateLoader } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './app.routes';
import { destinosReducer } from './state/destinos.reducer';
import { trackingReducer } from './state/tracking.reducer';
import { DestinosEffects } from './state/destinos.effects';
import {
  APP_CONFIG_TOKEN,
  API_URL_TOKEN,
  LoggerService,
  ConsoleLoggerService,
  MISMA_LOGGER_TOKEN
} from './di/ejemplo-di';
import { TrackingService } from './services/tracking.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ destinos: destinosReducer, tracking: trackingReducer }),
    provideEffects([DestinosEffects]),
    provideStoreDevtools({ maxAge: 25 }),
    provideAnimations(),

    provideTranslateService({
      lang: 'es',
      fallbackLang: 'es',
      loader: provideTranslateHttpLoader({
        prefix: './assets/i18n/',
        suffix: '.json'
      })
    }),

    // 1) InjectionToken con useValue
    { provide: APP_CONFIG_TOKEN, useValue: 'Mi App de Destinos Turísticos v2.0' },
    { provide: API_URL_TOKEN, useValue: 'https://api.destinos.com/v1' },

    // 2) useClass: abstracción -> implementación concreta
    { provide: LoggerService, useClass: ConsoleLoggerService },

    // 3) useExisting: token nuevo apunta al mismo servicio ya registrado
    { provide: MISMA_LOGGER_TOKEN, useExisting: LoggerService }
  ]
};
