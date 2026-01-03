import { computed, effect, inject, Injectable, PLATFORM_ID, signal } from "@angular/core";
import { ApiService } from "./api.service";
import { User } from "../../model/user";
import { AuthService } from "./auth.service";
import { isPlatformBrowser } from "@angular/common";

@Injectable({ providedIn: 'root' })
export class UserService extends ApiService {
    private authService = inject(AuthService);
    private platformId = inject(PLATFORM_ID);

    user = computed(() => {
        const json = this.authService.parseToken(this.authService.authToken() ?? '')
        if (json) {
            return new User(json.sub, json.username, json.role, json.createdAt)
        }
        return null;
    });

    constructor() {
        super();

        effect(() => {
            const token = this.authService.authToken();
            const json = token ? this.authService.parseToken(token) : null;

            if (isPlatformBrowser(this.platformId) && json) {
                const user = new User(json.sub, json.username, json.role, json.createdAt);
                localStorage.setItem('user', JSON.stringify(user));
            } else if (isPlatformBrowser(this.platformId)) {
                localStorage.removeItem('user');
            }
        })
    }
}