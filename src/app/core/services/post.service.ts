import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class PostService extends ApiService {

    constructor(private http: HttpClient) {
        super();
    }

    sendPost(message: string) {
        return this.http
            .post(
                `${this.API}/api/post`,
                {
                    "message": message
                }
            );
    }
}