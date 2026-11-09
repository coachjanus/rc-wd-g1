import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { LOCALE_ID } from '@angular/core';
// 1. Імпортуємо функції для реєстрації локалі
import { registerLocaleData } from '@angular/common';
import localeUk from '@angular/common/locales/uk';
// 2. Реєструємо українську локаль в Angular
registerLocaleData(localeUk, 'uk-UA');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // 3. Встановлюємо uk-UA локаллю за замовчуванням для всього застосунку
    { provide: LOCALE_ID, useValue: 'uk-UA' }
  ]
};
