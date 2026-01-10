import { Component, computed, inject, input } from '@angular/core';
import { MatCard, MatCardContent } from "@angular/material/card";
import { UserService } from '../../core/services/user.service';
import { format } from 'date-fns';
import { Observable } from 'rxjs';
import { User } from '../../model/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details',
  imports: [MatCard, MatCardContent, CommonModule],
  templateUrl: './user-details.html',
  styleUrl: './user-details.scss',
})
export class UserDetails {
  userService = inject(UserService);
  user$ = input.required<Observable<User | null>>();
  picUrl = 'assets/images/user.png';
  createdAt: Date = this.userService.currentUser()?.createdAt ?? new Date();
  userCreatedAt = format(this.createdAt, 'dd-MM-yyyy');
  userPosts = 0;
  userFollowers = 0;

  ngOnInit() {
    
  }
}
