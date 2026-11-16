import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleBadge } from './article-badge';

describe('ArticleBadge', () => {
  let component: ArticleBadge;
  let fixture: ComponentFixture<ArticleBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleBadge],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleBadge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
