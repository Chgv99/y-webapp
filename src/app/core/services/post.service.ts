import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { map, Observable, of } from "rxjs";
import { Post } from "../../model/post";

@Injectable({ providedIn: 'root' })
export class PostService extends ApiService {
    private readonly RESOURCE_URI = '/api/posts';

    constructor(private http: HttpClient, private authService: AuthService) {
        super();
    }

    sendPost(message: string) {
        return this.http
            .post(
                `${this.API_BASE_URL}/api/post`,
                {
                    "message": message
                }
            );
    }

    getPosts(): Observable<Post[]> {
        return this.getPostsByUser('');
    }
    
    getPostsByUser(username: String): Observable<Post[]> {
        if (!this.authService.authReady()) {
            return of([]);
        }

        var q: String;
        if (username === '') {
            q = `?page=0&size=10&sort=createdAt,desc`;
        } else {
            q = `?authorUsername=${username}&page=0&size=10&sort=createdAt,desc`;
        }

        return this.http
            .get<any>(`${this.API_BASE_URL}${this.RESOURCE_URI}${q}`)
            .pipe(
                map(response => response?.content || []),
                map((posts: Post[]) =>
                    posts.map(post => new Post(post.message, post.author, post.createdAt))
                )
            );
    }
}