import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PageService } from '../core/services/page.service';
import { Feed } from './feed/feed';
import { PostInput } from "./post-input/post-input";

@Component({
  selector: 'app-home',
  imports: [Feed, PostInput, MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  pageService = inject(PageService);
  constructor() {
    this.pageService.title.set('Home');
  }
}
