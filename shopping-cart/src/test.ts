function greet(name: string): string {
    return `Hello, ${name}!`;
}

console.log(greet("World"));
console.log(greet(123)); // This will cause a TypeScript error because 123 is not a string

const logAlbumInfo = (
    title: string, // error: Parameter 'title' implicitly has an 'any' type.
    trackCount: number, // error: Parameter 'trackCount' implicitly has an 'any' type.
    isReleased: boolean, // error: Parameter 'isReleased' implicitly has an 'any' type.
) => {
    // rest of function body
};

function add(a: number, b: number) {
    return a + b;
}

function concatStrings(a: string, b: string): string {
    return a + b;
}

const multiply = (a: number, b: number): number => {
    return a * b;
};

const divide = (a: number, b: number): number => {
    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }
    return a / b;
};

const isEven = (num: number): boolean => {
    return num % 2 === 0;
};

const isOdd = (num: number): boolean => {
    return num % 2 !== 0;
};

const square = (num: number): number => {
    return num * num;
};

const cube = (num: number): number => {
    return num * num * num;
};

const factorial = (num: number): number => {
    if (num < 0) {
        throw new Error("Factorial is not defined for negative numbers");
    }
    if (num === 0 || num === 1) {
        return 1;
    }
    let result = 1;
    for (let i = 2; i <= num; i++) {
        result *= i;
    }
    return result;
}

const names = ["Alice", "Bob", "Eve"];
// Contextual typing for function - parameter s inferred to have type string
names.forEach(function (s) {
    console.log(s.toUpperCase());
});
// Contextual typing also applies to arrow functions
names.forEach((s) => {
    console.log(s.toUpperCase());
});

// Проста перевантаженість за типом аргументу
// Перевантаження (варіанти виклику)
function reverse(value: string): string;
function reverse(value: number[]): number[];

// Реалізація (одна на всі випадки)
function reverse(value: string | number[]): string | number[] {
    if (typeof value === "string") {
        return value.split("").reverse().join("");
    } else {
        return value.slice().reverse();
    }
}
// Приклади використання
const str = reverse("TypeScript"); // string
const arr = reverse([
    1,
    2,
    3]); // number[]

// Різні типи значень, що повертаються
function toArray(value: string): string[];
function toArray(value: number): number[];
function toArray(value: string | number): (string | number)[] {
    return [value];
}
toArray("hi"); // string[]
toArray(42); // number[]

// // Різна кількість параметрів
// function createUser(name: string): { name: string };
// function createUser(name: string, age: number): { name: string; age: number };
// function createUser(name: string, age?: number) {
// return age ? { name, age } : { name };
// }
// createUser("Tim"); // { name: string }
// createUser("Tim", 25); // { name: string; age: number }

// // 1. Створення типу об'єкта User
// type User = {
//  id: number;
//  name: string;
//  email: string;
//  age?: any | number; // Знак '?' означає необов'язкове поле
// };

// // 2. Використання типу User як аргументу функції
// function printUserInfo(user: User): void {
//  console.log(`Користувач: ${user.name}, Email: ${user.email}`);
// }
// // 3. Приклад виклику функції
// const currentUser: User = {
//  id: 1,
//  name: 'Олена',
//  email: 'olena@example.com',
//  age: 28,
// };
// printUserInfo(currentUser);

// // Описуємо тип користувача
// interface User {
//     id: string;
//     email?: string;
//     name?: string;
//     age?: number;
// }

// // 1. Сигнатури перевантаження (описують допустимі варіанти виклику)
// function createUser(id: string): User;
// function createUser(id: string, email: string): User;
// function createUser(id: string, profile: { name: string; age: number }): User;

// function createUser(id: string, param2?: string | { name: string; age: number }): User {
//     // Базовий об'єкт, який буде створено в будь-якому випадку
//     const user: User = { id };
//     if (typeof param2 === 'string') {
//         // Якщо другий параметр — рядок, то це email
//         user.email = param2;
//     } else if (typeof param2 === 'object' && param2 !== null) {
//         // Якщо другий параметр — об'єкт, копіюємо дані профілю
//         user.name = param2.name;
//         user.age = param2.age;
//     }
//     return user;
// }

// // === Тестування викликів ===
// // 1. Створення лише за ID
// const user1 = createUser("usr_001");
// // Результат: { id: "usr_001" }
// // 2. Створення за ID та Email
// const user2 = createUser("usr_002", "alex@example.com");
// // Результат: { id: "usr_002", email: "alex@example.com" }
// // 3. Створення за ID та повним профілем
// const user3 = createUser("usr_003", { name: "Олена", age: 28 });
// // Результат: { id: "usr_003", name: "Олена", age: 28 }
// // Помилка компіляції (TypeScript заблокує цей виклик)
// // const user4 = createUser("usr_004", 42);

// Визначаємо ролі користувачів
type UserRole = 'admin' | 'editor' | 'user';
// Головний інтерфейс об'єкта User
interface User {
    id: string;
    email?: string;
    phone?: string;
    role: UserRole;
    createdAt: Date;
    name?: string;
    age?: number;
}

// Інтерфейс для детальних налаштувань (додаткова комбінація даних)
interface DetailedUserInfo {
    email?: string;
    phone?: string;
    role?: UserRole;
    name?: string;
    age?: number;
    createdAt?: Date;
}

// Варіант A: Мінімальний — тільки ID (роль та дата створюються автоматично)
function createUser(id: string): User;
// Варіант B: ID + Email + Роль (часта комбінація для швидкої реєстрації)
function createUser(id: string, email: string, role: UserRole): User;
// Варіант C: ID + Специфічний об'єкт з усіма можливими деталями
function createUser(id: string, details: DetailedUserInfo): User;

function createUser(
    id: string,
    param2?: string | DetailedUserInfo,
    param3?: UserRole
): User {
    // Задаємо значення за замовчуванням для обов'язкових полів
    const defaultUser: User = {
        id,
        role: 'user',
        createdAt: new Date()
    };
    // Перевіряємо Варіант B: другий параметр — рядок (email), третій — роль
    if (typeof param2 === 'string') {
        return {
            ...defaultUser,
            email: param2,
            role: param3 || 'user'
        };
    }
    // Перевіряємо Варіант C: другий параметр — об'єкт з деталями
    if (typeof param2 === 'object' && param2 !== null) {
        return {
            ...defaultUser,
            ...param2, // Перезаписуємо дефолтні поля тими, що прийшли в об'єкті
            role: param2.role || defaultUser.role,
            createdAt: param2.createdAt || defaultUser.createdAt
        };
    }
    // Перевіряємо Варіант A: просто повертаємо дефолтного юзера
    return defaultUser;
}
// === Тестування комбінацій ===
// Варіант A: Тільки ID
const quickUser = createUser("u_001");
// { id: "u_001", role: "user", createdAt: 2026-10-12... }
// Варіант B: ID, Email та специфічна Роль
const adminUser = createUser("u_002", "admin@app.com", "admin");
// { id: "u_002", email: "admin@app.com", role: "admin", createdAt: 2026-10-12... }
// Варіант C: ID + Об'єкт з телефоном та датою реєстрації
const customUser = createUser("u_003", {
 phone: "+380501234567",
 createdAt: new Date("2025-01-01"),
 name: "Дмитро"
});
// { id: "u_003", phone: "+380501234567", name: "Дмитро", role: "user", createdAt: 2025-01-01... }
