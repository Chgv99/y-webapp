import { Component, inject, input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageService } from '../core/services/page.service';

@Component({
  selector: 'app-user-details',
  imports: [],
  templateUrl: './user-details.html',
  styleUrl: './user-details.scss',
})
export class UserDetails {
  username = inject(ActivatedRoute).snapshot.paramMap.get('username');
  pageService = inject(PageService);
    constructor() {
      this.pageService.title.set(this.username?? 'User profile'); //generalize with a base class?
    }
}
