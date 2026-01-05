import { computed, effect, inject, Injectable, PLATFORM_ID } from "@angular/core";
import { User } from "../../model/user";
import { ApiService } from "./api.service";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class UserService extends ApiService {
    private authService = inject(AuthService);
    private platformId = inject(PLATFORM_ID);

    user = computed(() => {
        const json = this.authService.parseToken(this.authService.authToken() ?? '')
        if (json) {
            return new User(json.sub, json.username, json.role, new Date(json.createdAt))
        }
        return null;
    });

    constructor() {
        super();

        effect(() => {
            const token = this.authService.authToken();
            const json = token ? this.authService.parseToken(token) : null;

            if (json) {
                const user = new User(json.sub, json.username, json.role, json.createdAt);
                localStorage.setItem('user', JSON.stringify(user));
            } else {
                localStorage.removeItem('user');
            }
        })
    }
}