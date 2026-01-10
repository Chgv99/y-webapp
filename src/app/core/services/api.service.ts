import { environment } from "../../../environments/environment";

export class ApiService {
  protected readonly API_BASE_URL = `${environment.apiUrl}`;
}