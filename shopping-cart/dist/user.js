"use strict";
// 2. Імплементуємо інтерфейс у класі User
class User {
    // Конструктор для ініціалізації властивостей
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.isActive = true; // значення за замовчуванням
    }
    //  Class 'User' incorrectly implements interface 'IUser'.
    //   Property 'getProfileInfo' is missing in type 'User' but required in type 'IUser'.ts(2420)
    // user.ts(8, 5): 'getProfileInfo' is declared here.
    // Обов'язкова реалізація методу з інтерфейсу
    getProfileInfo() {
        return `Користувач: ${this.name} (${this.email}), ID: ${this.id} Status: ${this.isActive}`;
    }
    // У класі також можна створювати власні методи, яких немає в інтерфейсі
    toggleStatus() {
        this.isActive = !this.isActive;
    }
}
// 3. Використання класу
const myUser = new User(1, "Олександр", "alex@example.com");
console.log(myUser.getProfileInfo());
myUser.toggleStatus();
console.log(myUser.getProfileInfo());
// Виведе: Користувач: Олександр (alex@example.com), ID: 1
class ShortUser {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.isActive = true;
    }
    getProfileInfo() {
        return `${this.name} - ${this.email}`;
    }
}
const shortUser = new ShortUser(2, "Tom Cat", "tom@example.com");
console.log(shortUser.getProfileInfo());
class AUser {
    constructor(id, email, name, role) {
        this.id = id;
        this.email = email;
        this.role = role;
        this.name = name;
    }
    // Методи з IAuthenticatable
    login() {
        console.log(`Користувач  ${this.name}: ${this.email} увійшов в систему як ${this.role}.`);
    }
    logout() {
        console.log(`Користувач  ${this.name}: ${this.email} вийшов із системи.`);
    }
}
const aUser = new AUser("user_2", "jdoe@example.com", "John Doe", "Customer");
aUser.login();
aUser.logout();
