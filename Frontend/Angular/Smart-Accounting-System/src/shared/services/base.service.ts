import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  httpClient: HttpClient = inject(HttpClient);
  apiBaseURL = environment.apiBaseURL;
}
