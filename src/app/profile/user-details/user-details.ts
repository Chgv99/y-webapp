import { Component, computed, inject } from '@angular/core';
import { MatCard, MatCardContent } from "@angular/material/card";
import { UserService } from '../../core/services/user.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-user-details',
  imports: [MatCard, MatCardContent],
  templateUrl: './user-details.html',
  styleUrl: './user-details.scss',
})
export class UserDetails {
  userService = inject(UserService);
  picUrl = 'assets/images/user.png';
  createdAt: Date = this.userService.user()?.createdAt ?? new Date();
  userCreatedAt = format(this.createdAt, 'dd-MM-yyyy');
  userPosts = 0;
  userFollowers = 0;

  ngOnInit() {
    
  }
}
