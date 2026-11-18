import { Signal, signal, Injectable } from "@angular/core";
import { Post } from '../models/post';

@Injectable({
 providedIn: 'root', // <-- This makes it available application-wide
})
export class BlogService {
    // Початковий масив статей (загорнутий у Сигнал)
    readonly allPosts = signal<Post[]>([
        {
            id: 1,
            title: 'Знайомство з новим Control Flow в Angular',
            excerpt: 'Розбираємося, чому блоки @if та @for назавжди змінили спосіб написання шаблонів в Angular додатках.',
            category: 'Angular',
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid eius odit, tempore in sint sit harum tenetur assumenda, quasi, eveniet doloremque dolor? Vel labore quaerat debitis saepe temporibus ab dolorum.",
            date: new Date(2026, 10, 5),
            imageUrl: 'assets/images/picture1.jpg',
        },
        {
            id: 2,
            title: 'Як приручити View Encapsulation та :host стилі',
            excerpt: 'Повний гайд з ізоляції стилів: коли варто використовувати Emulated, а коли None чи ShadowDom.',
            category: 'CSS / Оформлення',
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid eius odit, tempore in sint sit harum tenetur assumenda, quasi, eveniet doloremque dolor? Vel labore quaerat debitis saepe temporibus ab dolorum.",
            date: new Date(2026, 11, 1),
            imageUrl: 'assets/images/picture2.jpg',
        },
        {
            id: 3,
            title: 'Оптимізація швидкодії веб-додатків у 2027 році',
            excerpt: 'Корисні поради та практичні кейси для зменшення розміру бандлу та покращення Core Web Vitals.',
            category: 'Performance',
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid eius odit, tempore in sint sit harum tenetur assumenda, quasi, eveniet doloremque dolor? Vel labore quaerat debitis saepe temporibus ab dolorum.",
            date: new Date(2026, 9, 28),
            imageUrl: 'https://picsum.photos1/200',
        },
        {
            id: 4,
            title: 'Автоматично згенерований список унікальних категорій',
            excerpt: 'Повний гайд з ізоляції стилів: коли варто використовувати Emulated, а коли None чи ShadowDom.',
            category: 'Performance',
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid eius odit, tempore in sint sit harum tenetur assumenda, quasi, eveniet doloremque dolor? Vel labore quaerat debitis saepe temporibus ab dolorum.",
            date: new Date(2026, 10, 12),
            imageUrl: 'assets/images/picture.jpg',
        },
        {
            id: 5,
            title: 'Control Flow в Angular',
            excerpt: 'Розбираємося, чому блоки @if та @for назавжди змінили спосіб написання шаблонів в Angular додатках.',
            category: 'Angular',
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid eius odit, tempore in sint sit harum tenetur assumenda, quasi, eveniet doloremque dolor? Vel labore quaerat debitis saepe temporibus ab dolorum.",
            date: new Date(2026, 11, 4),
            imageUrl: 'assets/images/picture1.jpg',
        },
    ]);

    // Отримати всі статті (з реального API або локального JSON)
    getPosts(): Signal<Post[]> {
        return this.allPosts;
    }
    // Отримати одну статтю за ID
    getPostById(id: string): Post | undefined {
        // Якщо стаття вже є в локальному кеші сигналів, повертаємо її миттєво
        const cachedPost = this.getPosts()().find(post => post.id === Number(id));
        if (cachedPost) {
            return cachedPost;
        }
        // Якщо стаття не знайдена в кеші, можна зробити запит до API (псевдокод)
        return undefined;
    }
}