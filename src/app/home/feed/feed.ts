import { Component, inject } from '@angular/core';
import { FeedService } from '../../core/services/feed.service';
import { Post } from '../../model/post';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feed',
  imports: [CommonModule],
  templateUrl: './feed.html',
  styleUrl: './feed.scss',
})
export class Feed {
  feedService = inject(FeedService);

  postList: Post[] = [];

  ngOnInit() {
    this.getFeed();
  }

  getFeed() {
    this.feedService.getFeed().subscribe({
      next: res => {
        console.log('res ', res)
        res.forEach(r => console.log('r', r.message));
        this.postList = res;
      },
      error: err => console.log('err ', err)
    })
  }

  trackById(index: number, post: Post) {
    return post.message;
  }
}
