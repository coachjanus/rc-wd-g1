// src/storage.ts (Робота з LocalStorage)
// Цей сервіс є повністю незалежним.

export class StorageService {
  static set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Помилка запису в LocalStorage за ключем "${key}":`, error);
    }
  }

  static get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      return item === null ? defaultValue : (JSON.parse(item) as T);
    } catch (error) {
      console.error(`Помилка зчитування з LocalStorage за ключем "${key}":`, error);
      return defaultValue;
    }
  }
}