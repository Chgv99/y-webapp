import { environment } from "../../../environments/environment";

export class ApiService {
  protected readonly API = `${environment.apiUrl}`;
}