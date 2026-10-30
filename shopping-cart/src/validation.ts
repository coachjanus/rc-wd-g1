// src/validation.ts (Логіка валідації форми)
// Чиста функція перевірки полів.

import { CheckoutFormData, FormErrors } from './types.js';
export function validateOrderForm(data: CheckoutFormData): FormErrors {
  const errors: FormErrors = {};

  const nameRegex = /^[а-яієїґA-Za-z]{2,}\s[а-яієїґA-Za-z]{2,}/i;
  if (!data.fullName.trim()) {
    errors.fullName = "Ім'я та прізвище є обов'язковими";
  } else if (!nameRegex.test(data.fullName.trim())) {
    errors.fullName = "Будь ласка, вкажіть ім'я та прізвище (мінімум два слова)";
  }

  const phoneRegex = /^\+380\d{9}$/;
  if (!data.phone.trim()) {
    errors.phone = "Номер телефону є обов'язковим";
  } else if (!phoneRegex.test(data.phone.trim().replace(/\s+/g, ''))) {
    errors.phone = "Формат телефону має бути +380XXXXXXXXX";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim()) {
    errors.email = "Email є обов'язковим";
  } else if (!emailRegex.test(data.email.trim())) {
    errors.email = "Некоректний формат Email";
  }

  if (!data.address.trim()) {
    errors.address = "Адреса доставки є обов'язковою";
  } else if (data.address.trim().length < 10) {
    errors.address = "Вкажіть повнішу адресу (місто, вулиця, будинок)";
  }

  return errors;
}