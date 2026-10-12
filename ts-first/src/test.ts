// let myBName: string = "TypeScript";
let myName = "TypeScript";
console.log(myName);
// myName = 1000; Type 'number' is not assignable to type 'string'.ts(2322) let myName: string
myName = "1000";
console.log(myName);

const json = JSON.parse("55");
// Більшість очікує, що json буде об’єктом, але це може бути рядок або число, як у цьому прикладі
console.log(typeof json);
// Цю поведінку можна вимкнути, увімкнувши noImplicitAny як параметр у проєкті TypeScript
// tsconfig.json. Це файл конфігурації JSON для налаштування поведінки деяких TypeScrip
