import { CarImage } from './../models/carImage';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl: string = "https://localhost:5001/api/CarImages/";

  constructor(private httpClient: HttpClient) { }

  getCarImagesByCarId(carId: number): Observable<ListResponseModel<CarImage>>{
    let newPath = this.apiUrl + "getbycarid?carId=" + carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
}
