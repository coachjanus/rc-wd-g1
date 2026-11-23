import { Routes } from '@angular/router';
import { PostList } from './features/blog/pages/post-list/post-list';
import { PostDetail } from './features/blog/components/post-detail/post-detail';
import { About } from './features/blog/pages/about/about';

export const routes: Routes = [
    { path: '', component: PostList },
    { path: 'post/:id', component: PostDetail },
    { path: 'about', component: About },
    { path: '**', redirectTo: '' }
];
