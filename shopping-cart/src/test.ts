// class Album1 implements IAlbum {
//     // protected title: string;
//     title: string;
//     artist: string;
//     releaseYear: number;
//     trackList: string[];

//     constructor(opts: { title: string; artist: string; releaseYear: number, trackList: string[] }) {
//         this.title = opts.title;
//         this.artist = opts.artist;
//         this.releaseYear = opts.releaseYear;
//         this.trackList = opts.trackList;
//     }
//     displayInfo() {
//         console.log(`${this.title} by ${this.artist}, released in ${this.releaseYear}.`,);
//     }
// }

// interface IAlbum {
//     title: string;
//     artist: string;
//     releaseYear: number;
//     trackList: string[];
// }

// class SpecialEditionAlbum extends Album1 {
//     // bonusTracks
//     // bonusTracks: string[];

//     // constructor(opts: { title: string; artist: string; releaseYear: number, bonusTracks: string[] }) {
//     //     super(opts);
//     //     this.bonusTracks = opts.bonusTracks;
//     // }

//     getTitle() {
//         return this.title;
//     }

//     override displayInfo() {
//         console.log(
//             `${this.title} by ${this.artist}, released in ${this.releaseYear}.`,
//         );
//         // console.log(`Bonus tracks: ${this.bonusTracks.join(", ")}`);
//     }
// }

// const opts = {
//     title: "Plastic Ono Band",
//     artist: "John Lennon",
//     releaseYear: 2000,
//     bonusTracks: ["Power to the People", "Do the Oz"],
// };

// // let specialEditionAlbum = new SpecialEditionAlbum(opts);

// abstract class AlbumBase {
//     title: string;
//     artist: string;
//     releaseYear: number;
//     trackList: string[] = [];
//     constructor(opts: { title: string; artist: string; releaseYear: number }) {
//         this.title = opts.title;
//         this.artist = opts.artist;
//         this.releaseYear = opts.releaseYear;
//     }
//     addTrack(track: string) {
//         this.trackList.push(track);
//     }

//     abstract addReview(author: string, review: string): void;
// }

// class Album extends AlbumBase {
//     addReview(author: string, review: string): void{

//     };
// }

// const album = new Album({
//     title: "Unknown Album",
//     artist: "Unknown Artist",
//     releaseYear: 0,
// });

function getFirstElement(arr: any[]): any {
    return arr[0];
}

console.log(typeof getFirstElement([1, 2, 3, 4]));

function getFirstItem<T>(arr: T[]): T {
    return arr[0];
}

console.log(typeof getFirstItem([1, 2, 3, 4]));
console.log(typeof getFirstItem(["11", "21", "31", "41"]));

interface ApiResponse<T> {
    status: "success" | "error";
    statusCode: number;
    data: T; // тип даних залежить від того, що ми передамо в <T>
}

// Опис користувача
interface User {
    id: number;
    name: string;
}
// Опис продукту
interface Product {
    id: string;
    title: string;
    price: number;
}

// Повторне використання інтерфейсу для різних сутностей:
const userResponse: ApiResponse<User> = {
    status: "success",
    statusCode: 200,
    data: { id: 1, name: "Олексій" }
};
const productResponse: ApiResponse<Product> = {
    status: "success",
    statusCode: 200,
    data: { id: "p1", title: "Ноутбук", price: 25000 }
}

interface HasLength {
    length: number;
}

// Тип T обов'язково повинен мати властивість length
function logLength<T extends HasLength>(item: T): void {
    console.log(`Довжина: ${item.length}`);
}
logLength("Привіт"); // Працює (у рядків є length)
logLength([1, 2, 3]); // Працює (у масивів є length)
// logLength(123); // Помилка компіляції: у чисел немає length

// Звичайна стрілочна функція (.ts)
const getRandomElement = <T>(array: T[]): T => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
};

function mergeObjects<T extends object, U extends object>(objA: T, objB: U): T & U {
    return { ...objA, ...objB };
}
// TypeScript автоматично виведе тип: { name: string } & { age: number }
const person = mergeObjects({ name: "Іван" }, { age: 25 });
console.log(person.name); // Працює!
console.log(person.age); // Працює!

// Якщо тип не вказано, T за замовчуванням буде string
interface Box<T = string> {
    content: T;
}
const stringBox: Box = { content: "Текст" }; // T є string за замовчуванням
const numberBox: Box<number> = { content: 42 }; // Явно перевизначили на number

function getValue<T extends object, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}
const user = { id: 1, username: "dev_user", isActive: true };
const username = getValue(user, "username"); // Тип: string
const userId = getValue(user, "id"); // Тип: number
// const error = getValue(user, "email");
// Помилка: Аргумент типу '"email"' не можна призначити параметру типу '"id" | "username" |"isActive"'

interface Todo {
    title: string;
    description: string;
    completed: boolean;
}
// 1. Partial<T> - робить усі поля необов'язковими
function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>): Todo {
    return { ...todo, ...fieldsToUpdate };
}

// 2. Readonly<T> - забороняє змінювати поля об'єкта
const myTodo: Readonly<Todo> = { title: "Learn TS", description: "Deep dive", completed: false };
// myTodo.completed = true;
// Помилка: Cannot assign to 'completed' because it is a read-only property


function myMap<T, U>(array: T[], callback: (item: T, index: number) => U): U[] {
    const result: U[] = [];
    for (let i = 0; i < array.length; i++) {
        result.push(callback(array[i], i));
    }
    return result;
}
// Приклад використання:
const numbers = [1, 2, 3, 4];
const strings = myMap(numbers, (num) => `Число ${num}`);
console.log(strings);
// strings має тип string[] -> ["Число 1", "Число 2", "Число 3"]


function myFilter<T>(array: T[], callback: (item: T, index: number) => boolean): T[] {
    const result: T[] = [];
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i], i)) {
            result.push(array[i]);
        }
    }
    return result;
}
// Приклад використання:
const mixedNumbers = [7, 9, 1, 2, 4, 6, 3, 5, 8];
const evens = myFilter(mixedNumbers, (num) => num % 2 === 0);
// evens має тип number[] -> [2, 4, 6]

console.log(evens);


function myReduce<T, U>(
    array: T[],
    callback: (accumulator: U, currentValue: T, index: number) => U,
    initialValue: U
): U {
    let accumulator = initialValue;
    for (let i = 0; i < array.length; i++) {
        accumulator = callback(accumulator, array[i], i);
    }
    return accumulator;
}
// Приклад використання:
const items = [{ price: 10 }, { price: 20 }, { price: 30 }];
const totalPrice = myReduce(items, (sum, item) => sum + item.price, 0);
// totalPrice має тип number -> 60

console.log(totalPrice);

// 1. Сигнатура для Type Guard (звуження типу)
function myTGFilter<T, U extends T>(
    array: T[],
    callback: (item: T, index: number) => item is U
): U[];
// 2. Стандартна сигнатура (для звичайних відповідей true/false)
function myTGFilter<T>(
    array: T[],
    callback: (item: T, index: number) => boolean
): T[];
// 3. Єдина реалізація функції
function myTGFilter<T>(
    array: T[],
    callback: (item: T, index: number) => boolean
): T[] {
    const result: T[] = [];
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i], i)) {
            result.push(array[i]);
        }
    }
    return result;
}

const mixedArray: (string | null | undefined)[] = ["Привіт", null, "Світ", undefined];
// Створюємо Type Guard функцію
const isNotNullish = (item: string | null | undefined): item is string => {
    return item !== null && item !== undefined;
};
// TypeScript автоматично виводить тип cleanArray як string[] (замість (string | null | undefined)[])
const cleanArray = myTGFilter(mixedArray, isNotNullish);
console.log(cleanArray); // ["Привіт", "Світ"]

interface Customer {
    role: string;
    name: string;
    // deleteUser: () => void;
}
interface Admin extends Customer {
    role: "admin";
    deleteUser: () => void
}
interface Guest extends Customer {
    role: "guest"
}

const users: (Admin | Guest)[] = [
    { role: "admin", name: "Аліса", deleteUser: () => { } },
    { role: "guest", name: "Іван" }
];

// Type Guard для перевірки, чи є користувач адміном
function isAdmin(user: Customer): user is Admin {
    return user.role === "admin";
}
// TypeScript розуміє, що admins — це масив типу Admin[]
const admins = myTGFilter(users, isAdmin);
// Тепер ми можемо безпечно викликати методи адміна без помилок типізації:
admins.forEach(admin => admin.deleteUser());


// 1. Сигнатура З початковим значенням: акумулятор типу U, результат типу U
function gReduce<T, U>(
    array: T[],
    callback: (accumulator: U, currentValue: T, index: number) => U,
    initialValue: U
): U;


// 2. Сигнатура БЕЗ початкового значення: акумулятор і результат мають тип T
function gReduce<T>(
    array: T[],
    callback: (accumulator: T, currentValue: T, index: number) => T
): T;

// 3. Єдина реалізація для обох випадків
function gReduce<T, U>(array: T[], callback: (accumulator: any, currentValue: T, index: number) =>
    any, initialValue?: U): any {
    // чи було передано initialValue (враховуємо випадок, коли передано undefined як аргумент)
    const hasInitialValue = arguments.length === 3;
    if (array.length === 0 && !hasInitialValue) {
        throw new TypeError("Reduce of empty array with no initial value");
    }
    // Якщо initialValue є, починаємо з 0-го індексу, якщо немає - акумулятором стає 0-й елемент, а цикл з 1-го
    let accumulator = hasInitialValue ? initialValue : array[0];
    let startIndex = hasInitialValue ? 0 : 1;
    for (let i = startIndex; i < array.length; i++) {
        accumulator = callback(accumulator, array[i], i);
    }
    return accumulator;
}

// Акумулятор `sum` автоматично отримує тип number
const sum = gReduce(numbers, (sum, num) => sum + num);
// sum = 10 (тип number)

// Трансформуємо масив об'єктів у число.
const cart = [{ price: 100 }, { price: 200 }];
// Обов'язково передаємо 0, щоб TypeScript знав, що акумулятор — це number, а не об'єкт
const total = gReduce(cart, (sum, item) => sum + item.price, 0);
// total = 300 (тип number)