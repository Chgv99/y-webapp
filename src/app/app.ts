import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BlobBackground } from './blob-background/blob-background';
import { Header } from "./header/header";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BlobBackground, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

}
