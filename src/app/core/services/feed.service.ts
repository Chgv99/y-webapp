import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { map } from "rxjs";
import { Post } from "../../model/post";
import { ApiService } from "./api.service";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class FeedService extends ApiService {

    feed = signal<Post[]>([]);

    constructor(private http: HttpClient, private authService: AuthService) {
        super();
    }

    getFeed() {
        if (!this.authService.authReady()) return;
        this.http
            .get<any>(`${this.API}/api/post?page=0&size=10&sort=createdAt,desc`)
            .pipe(
                map(response => response?.content || []),
                map((posts: Post[]) =>
                    posts.map(post => new Post(post.message, post.author, post.createdAt))
                )
            ).subscribe((posts: Post[]) => {
                this.feed.set(posts);
            })
    }
}