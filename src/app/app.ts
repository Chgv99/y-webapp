import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BlobBackground } from './blob-background/blob-background';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BlobBackground],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

}
