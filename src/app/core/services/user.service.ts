import { Injectable, signal } from "@angular/core";
import { ApiService } from "./api.service";
import { User } from "../../model/user";

export var user = signal<User | null>(null);

@Injectable({ providedIn: 'root' })
export class UserService extends ApiService {

}