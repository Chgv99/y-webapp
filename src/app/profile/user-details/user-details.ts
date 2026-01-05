import { Component } from '@angular/core';
import { MatCard, MatCardContent } from "@angular/material/card";
import { Page } from '../../page/page';

@Component({
  selector: 'app-user-details',
  imports: [MatCard, MatCardContent],
  templateUrl: './user-details.html',
  styleUrl: './user-details.scss',
})
export class UserDetails {
  picUrl = 'assets/images/user.png';
}
