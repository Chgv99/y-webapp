import { computed, effect, inject, Injectable, PLATFORM_ID } from "@angular/core";
import { User } from "../../model/user";
import { ApiService } from "./api.service";
import { AuthService } from "./auth.service";
import { map, Observable, of } from "rxjs";
import { Post } from "../../model/post";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class UserService extends ApiService {
    private authService = inject(AuthService);
    private platformId = inject(PLATFORM_ID);

    private readonly RESOURCE_URI = '/api/users';

    public currentUser = computed(() => {
        const json = this.authService.parseToken(this.authService.authToken() ?? '')
        if (json) {
            return new User(json.sub, json.username, json.role, new Date(json.createdAt))
        }
        return null;
    });

    constructor(private http: HttpClient) {
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

    getUser(username: String): Observable<User | null> {
        if (!this.authService.authReady()) {
            return of(null);
        }

        return this.http
            .get<any>(`${this.API_BASE_URL}${this.RESOURCE_URI}?usernames=${username}`)
            .pipe(
                map((users: any[]) => users.length > 0 ? new User(users[0].uuid, users[0].username, '', users[0].createdAt) : null)
            );
    }

    // PAGINATED
    // getUser(username: String): Observable<User | null> {
    //     if (!this.authService.authReady()) {
    //         return of(null);
    //     }

    //     return this.http
    //         .get<any>(`${this.API_BASE_URL}${this.RESOURCE_URI}?usernames=${username}`)
    //         .pipe(
    //             map(response => response?.content || []),
    //             map((users: any[]) => users.length > 0 ? new User(users[0].uuid, users[0].username, '', users[0].createdAt) : null)
    //         );
    // }
}