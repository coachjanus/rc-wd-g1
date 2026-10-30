export class StorageService {
    static set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        }
        catch (error) {
            console.error(`Помилка запису в LocalStorage за ключем "${key}":`, error);
        }
    }
    static get(key, defaultValue) {
        try {
            const item = localStorage.getItem(key);
            return item === null ? defaultValue : JSON.parse(item);
        }
        catch (error) {
            console.error(`Помилка зчитування з LocalStorage за ключем "${key}":`, error);
            return defaultValue;
        }
    }
}
