import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { BrandRespondModel } from '../models/brandResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = "https://localhost:44384/api/Brands/getall"
  constructor(private httpClient: HttpClient) { }

  getBrands():Observable<BrandRespondModel>{
    return this.httpClient.get<BrandRespondModel>(this.apiUrl);
  }
}
