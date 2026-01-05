import { Component } from '@angular/core';
import { MatCard, MatCardHeader, MatCardContent, MatCardFooter } from "@angular/material/card";

@Component({
  selector: 'app-footer',
  imports: [MatCard, MatCardHeader, MatCardContent, MatCardFooter],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {

}
