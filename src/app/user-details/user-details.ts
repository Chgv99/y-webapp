import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from '../page/page';

@Component({
  selector: 'app-user-details',
  imports: [],
  templateUrl: './user-details.html',
  styleUrl: './user-details.scss',
})
export class UserDetails extends Page {
  username = inject(ActivatedRoute).snapshot.paramMap.get('username');

  protected override loadPageData(): void {
    this.pageService.title = this.username?? 'User profile';
  }
}
