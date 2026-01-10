import { HttpClient } from "@angular/common/http";
import { inject, Inject, Injectable, signal } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { Post } from "../../model/post";
import { ApiService } from "./api.service";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";
import { PostService } from "./post.service";

@Injectable({ providedIn: 'root' })
export class FeedService extends ApiService {
    feed = signal<Post[]>([]);

    constructor(private http: HttpClient, private authService: AuthService, private postService: PostService) {
        super();
    }

    getGenericFeed(): Observable<Post[]> {
        return this.postService.getPosts()
    }

    getFeedByUser(username: String): Observable<Post[]> {
        return this.postService.getPostsByUser(username);
    }
}