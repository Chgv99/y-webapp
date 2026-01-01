import { Component } from '@angular/core';
import { Feed } from './feed/feed';
import { PostInput } from "./post-input/post-input";

@Component({
  selector: 'app-home',
  imports: [Feed, PostInput],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
