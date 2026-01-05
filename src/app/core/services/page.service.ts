import { inject, Injectable, signal } from "@angular/core";
import { ApiService } from "./api.service";
import { Title } from "@angular/platform-browser";

@Injectable({ providedIn: 'root' })
export class PageService extends ApiService {
    private titleService = inject(Title);
    private titleSignal = signal<string>('Title');

    public get title(): string {
        return this.titleSignal();
    }

    public set title(title: string) {
        this.titleSignal.set(title);
        this.titleService.setTitle(title);
    }
}