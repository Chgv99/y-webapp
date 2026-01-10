import { HttpClient } from "@angular/common/http";
import { inject, Inject, Injectable, signal } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { Post } from "../../model/post";
import { ApiService } from "./api.service";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";

@Injectable({ providedIn: 'root' })
export class FeedService extends ApiService {
    private readonly RESOURCE_URI = '/api/posts';
    feed = signal<Post[]>([]);

    constructor(private http: HttpClient, private authService: AuthService, private userService: UserService) {
        super();
    }

    getFeed(): Observable<Post[]> {
        if (!this.authService.authReady()) {
            return of([]);
        }

        return this.http
            .get<any>(`${this.API_BASE_URL}${this.RESOURCE_URI}?page=0&size=10&sort=createdAt,desc`)
            .pipe(
                map(response => response?.content || []),
                map((posts: Post[]) =>
                    posts.map(post => new Post(post.message, post.author, post.createdAt))
                )
            );
    }

    getFeedByUser(username: String): Observable<Post[]> {
        if (!this.authService.authReady()) {
            return of([]);
        }

        return this.http
            .get<any>(`${this.API_BASE_URL}${this.RESOURCE_URI}?authorUsername=${username}&page=0&size=10&sort=createdAt,desc`)
            .pipe(
                map(response => response?.content || []),
                map((posts: Post[]) =>
                    posts.map(post => new Post(post.message, post.author, post.createdAt))
                )
            );
    }
}