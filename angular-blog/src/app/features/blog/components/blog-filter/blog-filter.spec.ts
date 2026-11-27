import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogFilter } from './blog-filter';

describe('BlogFilter', () => {
  let component: BlogFilter;
  let fixture: ComponentFixture<BlogFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogFilter],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
