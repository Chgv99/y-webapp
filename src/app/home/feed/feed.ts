import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FeedService } from '../../core/services/feed.service';
import { Post } from '../../model/post';
import { FeedPost } from './feed-post/feed-post';

@Component({
  selector: 'app-feed',
  imports: [CommonModule, FeedPost],
  templateUrl: './feed.html',
  styleUrl: './feed.scss',
})
export class Feed {
  feedService = inject(FeedService);

  ngOnInit() {
    this.getFeed();
  }

  getFeed() {
    this.feedService.getFeed();
  }

  trackById(index: number, post: Post) {
    return post.message;
  }
}
