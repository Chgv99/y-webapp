import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../model/post';
import { FeedPost } from './feed-post/feed-post';

@Component({
  selector: 'app-feed',
  imports: [CommonModule, FeedPost],
  templateUrl: './feed.html',
  styleUrl: './feed.scss',
})
export class Feed {
  feed = input<Observable<Post[]>>();

  trackById(index: number, post: Post) {
    return post.message;
  }
}
