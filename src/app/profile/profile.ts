import { Component, computed, inject, signal } from '@angular/core';
import { UserDetails } from "./user-details/user-details";
import { Page } from '../page/page';
import { ActivatedRoute } from '@angular/router';
import { Feed } from "../home/feed/feed";
import { FeedService } from '../core/services/feed.service';
import { Post } from '../model/post';
import { UserService } from '../core/services/user.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profile',
  imports: [UserDetails, Feed],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile extends Page {
  userService = inject(UserService);
  feedService = inject(FeedService);
  route = inject(ActivatedRoute);

  paramMap = toSignal(this.route.paramMap, { initialValue: this.route.snapshot.paramMap });

  username = computed(() => this.paramMap()?.get('username'));
  user$ = computed(() => this.userService.getUser(this.username() ?? ''));
  
  feed$ = computed(() => this.feedService.getFeedByUser(this.username() ?? ''));

  // override ngOnInit() {
  //   this.getFeed();
  // }

  // getFeed() {
  //   this.feedService.getFeed();
  // }

  // protected override loadPageData(): void {
  //   this.pageService.title = this.username?? 'User profile';
  // }
}
