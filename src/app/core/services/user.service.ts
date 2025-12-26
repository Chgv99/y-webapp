import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class UserService {

  private readonly API = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  login(username: string, password: string)/*: Observable<LoginResponse>*/ {
    return this.http.post(`${this.API}/auth/login`, { username: username, password: password });
  }

  //   getAll(): Observable<User[]> {
  //     return this.http.get<User[]>(this.API);
  //   }

  //   getById(id: string): Observable<User> {
  //     return this.http.get<User>(`${this.API}/${id}`);
  //   }

  //   create(dto: CreateUserDto): Observable<User> {
  //     return this.http.post<User>(this.API, dto);
  //   }
}