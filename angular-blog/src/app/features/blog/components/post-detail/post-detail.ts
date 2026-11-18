import { Component, OnInit, inject, signal, DestroyRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { switchMap, of } from 'rxjs';
import { Post } from '../../core/models/post';
import { BlogService } from '../../core/services/blog.service';


@Component({
  selector: 'app-post-detail',
  imports: [DatePipe, RouterModule],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.css',
})
export class PostDetail implements OnInit {

  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);
  private destroyRef = inject(DestroyRef);

  // Сигнали для реактивного стану сторінки
  post = signal<Post | undefined>(undefined);
  loading = signal<boolean>(true);
  error = signal<boolean>(false)

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap(params => {
      this.loading.set(true);
      this.error.set(false);
      const id = params.get('id');
      return id ? of(this.blogService.getPostById(id)) : of(undefined);
    }),
    takeUntilDestroyed(this.destroyRef)
    )
    .subscribe({
      next: (data) => {
      this.post.set(data);
      this.loading.set(false);
    },
    error: () => {
      this.error.set(true);
      this.loading.set(false);
    }
  });
 }}
