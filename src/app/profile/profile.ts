import { Component, inject } from '@angular/core';
import { UserDetails } from "./user-details/user-details";
import { Page } from '../page/page';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [UserDetails],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile extends Page {
  username = inject(ActivatedRoute).snapshot.paramMap.get('username');

  // protected override loadPageData(): void {
  //   this.pageService.title = this.username?? 'User profile';
  // }
}
