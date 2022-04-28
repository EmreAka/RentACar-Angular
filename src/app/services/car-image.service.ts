import { CarImage } from './../models/carImage';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl: string = environment.apiUrl + "/CarImages/";

  constructor(private httpClient: HttpClient) { }

  getCarImagesByCarId(carId: number): Observable<ListResponseModel<CarImage>>{
    let newPath = this.apiUrl + "getbycarid?carId=" + carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  deleteCarImage(carImage: CarImage): Observable<ResponseModel>{
    let newPath = this.apiUrl + "delete";
    return this.httpClient.post<ResponseModel>(newPath, carImage);
  }

  deletCarImageById(carImageId: number): Observable<ResponseModel>{
    let newPath = this.apiUrl + "deletebyid?id=" + carImageId;
    return this.httpClient.delete<ResponseModel>(newPath);
  }

  upload(file: any, carId: string):Observable<any> {

    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append("file", file);
    formData.append("carImage.CarId", carId);

    // Make http post request over api
    // with formData as req
    return this.httpClient.post(this.apiUrl + "add", formData)
}
}
