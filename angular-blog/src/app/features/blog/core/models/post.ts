// Опишемо інтерфейс src/app/features/blog/core/models/post.ts
export interface Post {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    content: string;
    author: string;
    date: Date;
    imageUrl?: string;
    likesCount: number;
};

export const MOCK_POSTS: Post[] = [
    {
        id: 1,
        title: 'Знайомство з новим Control Flow в Angular',
        excerpt: 'Розбираємося, чому блоки @if та @for назавжди змінили спосіб написання шаблонів в Angular додатках.',
        category: 'Angular',
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid eius odit, tempore in sint sit harum tenetur assumenda, quasi, eveniet doloremque dolor? Vel labore quaerat debitis saepe temporibus ab dolorum.",
        author: "John Doe",
        date: new Date(2026, 10, 5),
        imageUrl: 'assets/images/picture1.jpg',
        likesCount: 10
    },
    {
        id: 2,
        title: 'Як приручити View Encapsulation та :host стилі',
        excerpt: 'Повний гайд з ізоляції стилів: коли варто використовувати Emulated, а коли None чи ShadowDom. Повний гайд з ізоляції стилів: коли варто використовувати Emulated, а коли None чи ShadowDom.',
        category: 'CSS / Оформлення',
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid eius odit, tempore in sint sit harum tenetur assumenda, quasi, eveniet doloremque dolor? Vel labore quaerat debitis saepe temporibus ab dolorum.",
        author: "Mary Ann",
        date: new Date(2026, 10, 1),
        imageUrl: 'assets/images/picture2.jpg',
        likesCount: 6
    },
    {
        id: 3,
        title: 'Оптимізація швидкодії веб-додатків у 2027 році',
        excerpt: 'Корисні поради та практичні кейси для зменшення розміру бандлу та покращення Core Web Vitals.',
        category: 'Performance',
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid eius odit, tempore in sint sit harum tenetur assumenda, quasi, eveniet doloremque dolor? Vel labore quaerat debitis saepe temporibus ab dolorum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid eius odit, tempore in sint sit harum tenetur assumenda, quasi, eveniet doloremque dolor? Vel labore quaerat debitis saepe temporibus ab dolorum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid eius odit, tempore in sint sit harum tenetur assumenda, quasi, eveniet doloremque dolor? Vel labore quaerat debitis saepe temporibus ab dolorum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid eius odit, tempore in sint sit harum tenetur assumenda, quasi, eveniet doloremque dolor? Vel labore quaerat debitis saepe temporibus ab dolorum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid eius odit, tempore in sint sit harum tenetur assumenda, quasi, eveniet doloremque dolor? Vel labore quaerat debitis saepe temporibus ab dolorum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid eius odit, tempore in sint sit harum tenetur assumenda, quasi, eveniet doloremque dolor? Vel labore quaerat debitis saepe temporibus ab dolorum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid eius odit, tempore in sint sit harum tenetur assumenda, quasi, eveniet doloremque dolor? Vel labore quaerat debitis saepe temporibus ab dolorum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid eius odit, tempore in sint sit harum tenetur assumenda, quasi, eveniet doloremque dolor? Vel labore quaerat debitis saepe temporibus ab dolorum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid eius odit, tempore in sint sit harum tenetur assumenda, quasi, eveniet doloremque dolor? Vel labore quaerat debitis saepe temporibus ab dolorum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid eius odit, tempore in sint sit harum tenetur assumenda, quasi, eveniet doloremque dolor? Vel labore quaerat debitis saepe temporibus ab dolorum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid eius odit, tempore in sint sit harum tenetur assumenda, quasi, eveniet doloremque dolor? Vel labore quaerat debitis saepe temporibus ab dolorum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid eius odit, tempore in sint sit harum tenetur assumenda, quasi, eveniet doloremque dolor? Vel labore quaerat debitis saepe temporibus ab dolorum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid eius odit, tempore in sint sit harum tenetur assumenda, quasi, eveniet doloremque dolor? Vel labore quaerat debitis saepe temporibus ab dolorum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid eius odit, tempore in sint sit harum tenetur assumenda, quasi, eveniet doloremque dolor? Vel labore quaerat debitis saepe temporibus ab dolorum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid eius odit, tempore in sint sit harum tenetur assumenda, quasi, eveniet doloremque dolor? Vel labore quaerat debitis saepe temporibus ab dolorum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid eius odit, tempore in sint sit harum tenetur assumenda, quasi, eveniet doloremque dolor? Vel labore quaerat debitis saepe temporibus ab dolorum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid eius odit, tempore in sint sit harum tenetur assumenda, quasi, eveniet doloremque dolor? Vel labore quaerat debitis saepe temporibus ab dolorum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid eius odit, tempore in sint sit harum tenetur assumenda, quasi, eveniet doloremque dolor? Vel labore quaerat debitis saepe temporibus ab dolorum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid eius odit, tempore in sint sit harum tenetur assumenda, quasi, eveniet doloremque dolor? Vel labore quaerat debitis saepe temporibus ab dolorum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid eius odit, tempore in sint sit harum tenetur assumenda, quasi, eveniet doloremque dolor? Vel labore quaerat debitis saepe temporibus ab dolorum.",
        author: "Tom Cat",
        date: new Date(2026, 9, 28),
        imageUrl: 'https://picsum.photos1/200',
        likesCount: 1
    },
    {
        id: 4,
        title: 'Автоматично згенерований список унікальних категорій',
        excerpt: 'Повний гайд з ізоляції стилів: коли варто використовувати Emulated, а коли None чи ShadowDom.',
        category: 'Performance',
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid eius odit, tempore in sint sit harum tenetur assumenda, quasi, eveniet doloremque dolor? Vel labore quaerat debitis saepe temporibus ab dolorum.",
        author: "Mary Ann",
        date: new Date(2026, 10, 12),
        imageUrl: 'assets/images/picture.jpg',
        likesCount: 7
    },
    {
        id: 5,
        title: 'Control Flow в Angular',
        excerpt: 'Розбираємося, чому блоки @if та @for назавжди змінили спосіб написання шаблонів в Angular додатках.',
        category: 'Angular',
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid eius odit, tempore in sint sit harum tenetur assumenda, quasi, eveniet doloremque dolor? Vel labore quaerat debitis saepe temporibus ab dolorum.",
        author: "Tom Cat",
        date: new Date(2026, 11, 4),
        imageUrl: 'assets/images/picture1.jpg',
        likesCount: 2
    },
    {
        id: 6,
        title: 'Pipes в Angular',
        excerpt: 'Розбираємося, чому блоки @if та @for назавжди змінили спосіб написання шаблонів в Angular додатках.',
        category: 'Angular',
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid eius odit, tempore in sint sit harum tenetur assumenda, quasi, eveniet doloremque dolor? Vel labore quaerat debitis saepe temporibus ab dolorum.",
        author: "Tom Cat",
        date: new Date(2026, 9, 24),
        imageUrl: 'assets/images/picture3.jpg',
        likesCount: 27
    },
];