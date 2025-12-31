import { Component, input } from '@angular/core';
import { Post } from '../../../model/post';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-feed-post',
  imports: [MatCardModule],
  templateUrl: './feed-post.html',
  styleUrl: './feed-post.scss',
})
export class FeedPost {
  post = input.required<Post>();
}
