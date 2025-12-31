import { Component, inject, signal } from '@angular/core';
import { FeedService } from '../../core/services/feed.service';
import { Post } from '../../model/post';
import { CommonModule } from '@angular/common';
import { FeedPost } from './feed-post/feed-post';

@Component({
  selector: 'app-feed',
  imports: [CommonModule, FeedPost],
  templateUrl: './feed.html',
  styleUrl: './feed.scss',
})
export class Feed {
  feedService = inject(FeedService);

  postList = signal<Post[]>([]);

  ngOnInit() {
    this.getFeed();
  }

  getFeed() {
    this.feedService.getFeed().subscribe({
      next: res => {
        console.log('res ', res)
        res.forEach(r => console.log('r', r.message));
        this.postList.set(res);
      },
      error: err => console.log('err ', err)
    })
  }

  trackById(index: number, post: Post) {
    return post.message;
  }
}
