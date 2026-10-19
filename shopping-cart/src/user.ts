// 1. Описуємо інтерфейс IUser
interface IUser {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
    // Метод без реалізації (тільки сигнатура)
    getProfileInfo(): string;
}

// 2. Імплементуємо інтерфейс у класі User
class User implements IUser {
    id: number;
    name: string;
    email: string;
    isActive: boolean;

    // Конструктор для ініціалізації властивостей
    constructor(id: number, name: string, email: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.isActive = true; // значення за замовчуванням
    }
    //  Class 'User' incorrectly implements interface 'IUser'.
    //   Property 'getProfileInfo' is missing in type 'User' but required in type 'IUser'.ts(2420)
    // user.ts(8, 5): 'getProfileInfo' is declared here.
    // Обов'язкова реалізація методу з інтерфейсу
    getProfileInfo(): string {
        return `Користувач: ${this.name} (${this.email}), ID: ${this.id} Status: ${this.isActive}`;
    }

    // У класі також можна створювати власні методи, яких немає в інтерфейсі
    toggleStatus(): void {
        this.isActive = !this.isActive;
    }
}

// 3. Використання класу
const myUser = new User(1, "Олександр", "alex@example.com");
console.log(myUser.getProfileInfo());
myUser.toggleStatus();
console.log(myUser.getProfileInfo());
// Виведе: Користувач: Олександр (alex@example.com), ID: 1

class ShortUser implements IUser {
    isActive: boolean = true;
    constructor(
        public id: number,
        public name: string,
        public email: string
    ) { }
    getProfileInfo(): string {
        return `${this.name} - ${this.email}`;
    }
}

const shortUser = new ShortUser(2, "Tom Cat", "tom@example.com");
console.log(shortUser.getProfileInfo());


// 1. Перший інтерфейс (базові дані)
interface IIdentifiable {
    id: string;
    email: string;
    name: string;
}
// 2. Другий інтерфейс (безпека та дії)
interface IAuthenticatable {
    role: string;
    login(): void;
    logout(): void;
}

class AUser implements IIdentifiable, IAuthenticatable {
    // Клас реалізує обидва інтерфейси через кому
    // Властивості з IIdentifiable
    id: string;
    email: string;
    name: string;
    role: string; // Властивість з IAuthenticatable
    constructor(id: string, email: string, name: string, role: string) {
        this.id = id;
        this.email = email;
        this.role = role;
        this.name = name;
    }
    // Методи з IAuthenticatable
    login(): void {
        console.log(`Користувач  ${this.name}: ${this.email} увійшов в систему як ${this.role}.`);
    }
    logout(): void {
        console.log(`Користувач  ${this.name}: ${this.email} вийшов із системи.`);
    }
}

const aUser = new AUser("user_2", "jdoe@example.com", "John Doe", "Customer");
aUser.login();
aUser.logout();

interface IFullUser extends IIdentifiable, IAuthenticatable { }


interface ILocalSaver {
    save(): void;
}
interface ICloudSaver {
    save(): void;
}
// Обидва інтерфейси вимагають метод save(): void
class BackupManager implements ILocalSaver, ICloudSaver {
    // Одна реалізація покриває обидва інтерфейси
    save(): void {
        console.log("Дані збережено і локально, і в хмару!");
    }
}


interface IEmailNotifier {
    // Очікує текст повідомлення, повертає boolean (успішно чи ні)
    notify(message: string): boolean;
}
interface ISmsNotifier {
    // Очікує код помилки у вигляді числа, нічого не повертає
    notify(code: number): void;
}

class OUser implements IEmailNotifier, ISmsNotifier {
    // 1. Оголошуємо сигнатури для сумісності з інтерфейсами (без тіла методу)
    notify(message: string): boolean;
    notify(code: number): void;
    // 2. Єдина універсальна реалізація методу
    // Тип параметра об'єднуємо через union (string | number)
    // Тип повернення об'єднуємо або використовуємо any
    notify(payload: string | number): any {
        if (typeof payload === "string") {
            console.log(`Надсилаємо Email: ${payload}`);
            return true; // задовольняє IEmailNotifier
        } else if (typeof payload === "number") {
            console.log(`Надсилаємо SMS з кодом помилки: ${payload}`);
            // повертає undefined за замовчуванням, що задовольняє void в ISmsNotifier
        }
    }
}

// Використання:
const ouser = new OUser();
const emailResult = ouser.notify("Привіт!"); // Працює як функція з string -> boolean
ouser.notify(404); // Працює як функція з number -> void


// 1. Описуємо інтерфейс з опціональними членами
interface IOUser {
    id: number;
    name: string;
    // Опціональні властивості
    age?: number;
    phoneNumber?: string;
    // Опціональний метод
    sendNotification?(): void;
}

class OPUser implements IOUser {
    id: number;
    name: string;
    age?: number; // Ми вирішили реалізувати лише одну опціональну властивість
    // phoneNumber та sendNotification ми вирішили взагалі не додавати в цей клас
    constructor(id: number, name: string, age?: number) {
        this.id = id;
        this.name = name;
        if (age) {
            this.age = age;
        }
    }
}
// 3. Створення об'єктів
const userWithAge = new OPUser(1, "Іван", 25);
const userWithoutAge = new OPUser(2, "Марія");
console.log(userWithAge.age); // Виведе: 25
console.log(userWithoutAge.age); // Виведе: undefined

