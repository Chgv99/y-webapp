import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { ThisReceiver } from "@angular/compiler";
import { Post } from "../../model/post";
import { map, Observable } from "rxjs";
import { User } from "../../model/user";

@Injectable({ providedIn: 'root' })
export class FeedService {

    private readonly API = `${environment.apiUrl}`;

    constructor(private http: HttpClient) { }

    getFeed(): Observable<Post[]> {
        return this.http
            .get<any>(`${this.API}/api/post?page=0&size=10&sort=createdAt,desc`)
            .pipe(
                map(response => response?.content || []),
                map((posts: Post[]) =>
                    posts.map(post => new Post(post.message, post.author, post.createdAt))
                )
            );
    }
}