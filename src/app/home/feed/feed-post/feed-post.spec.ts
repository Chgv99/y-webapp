import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedPost } from './feed-post';

describe('FeedPost', () => {
  let component: FeedPost;
  let fixture: ComponentFixture<FeedPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedPost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedPost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
