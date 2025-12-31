import { Component, input } from '@angular/core';
import { Post } from '../../../model/post';

@Component({
  selector: 'app-feed-post',
  imports: [],
  templateUrl: './feed-post.html',
  styleUrl: './feed-post.scss',
})
export class FeedPost {
  post = input.required<Post>();
}
