// Опишемо інтерфейс
export interface Post {
 id: number;
 title: string;
 excerpt: string;
 category: string;
 content: string;
 date: Date;
 imageUrl?: string;
}
