import { Component, inject } from '@angular/core';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatCard, MatCardContent, MatCardFooter } from "@angular/material/card";
import { MatButtonModule } from '@angular/material/button';
import { PostService } from '../../core/services/post.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FeedService } from '../../core/services/feed.service';

@Component({
  selector: 'app-post-input',
  imports: [ReactiveFormsModule, MatCard, MatCardContent, MatInputModule, MatButtonModule, MatCardFooter],
  templateUrl: './post-input.html',
  styleUrl: './post-input.scss',
})
export class PostInput {
  postService = inject(PostService);
  feedService = inject(FeedService);
  form!: FormGroup;
  submitted = false;

  ngOnInit() {
    this.form = new FormGroup({
      message: new FormControl('', Validators.required)
    })
  }

  onSubmit() {
    this.submitted = true;
    if (!this.form.valid) return;
    this.postService.sendPost(this.form.value.message).subscribe(() => {
      this.feedService.getFeed();
      this.form.reset();
    })
  }
}
