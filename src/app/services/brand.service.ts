import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs';
import {Brand} from '../models/brand';
import {ResponseModel} from '../models/responseModel';
import {ListResponseModel} from '../models/listResponseModel';
import {SingleResponseModel} from '../models/singleResponseModel';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  getBrands(): Observable<ListResponseModel<Brand>> {
    let newPath = this.apiUrl + "/Brands/getall";
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  getBrandById(brandId: number): Observable<SingleResponseModel<Brand>> {
    let newPath: string = this.apiUrl + "/Brands/getbyid?id=" + brandId;
    return this.httpClient.get<SingleResponseModel<Brand>>(newPath);
  }

  add(brand: Brand): Observable<ResponseModel> {
    let newPath: string = this.apiUrl + "/Brands/add"
    return this.httpClient.post<ResponseModel>(newPath, brand);
  }

  delete(brand: any): Observable<ResponseModel>{
    let newPath: string = this.apiUrl + "/Brands/delete";
    return this.httpClient.post<ResponseModel>(newPath, brand);
  }

  update(brand: Brand): Observable<ResponseModel> {
    let newPath: string = this.apiUrl + "/Brands/update";
    return this.httpClient.post<ResponseModel>(newPath, brand);
  }
}
