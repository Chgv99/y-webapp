import { Injectable, signal } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({ providedIn: 'root' })
export class PageService extends ApiService {
    public title = signal<string>('Title');
}