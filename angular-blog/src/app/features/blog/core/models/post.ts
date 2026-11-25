// Опишемо інтерфейс
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
}
