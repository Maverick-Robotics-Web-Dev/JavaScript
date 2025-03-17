import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '@core/config';
import { BranchOfficeResponseModel } from '@core/models/settings';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  httpClient: HttpClient = inject(HttpClient);
  RESTAPI_URL = API_URL;
}
