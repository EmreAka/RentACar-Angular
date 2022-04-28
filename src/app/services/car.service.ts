import { PlainCar } from './../models/plainCar';
import { SingleResponseModel } from './../models/singleResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newPath:string = this.apiUrl + "/Cars/getcardetails";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarById(carId: number):Observable<SingleResponseModel<PlainCar>>{
    let newPath: string = this.apiUrl + "/Cars/getbyid?id=" + carId;
    return this.httpClient.get<SingleResponseModel<PlainCar>>(newPath);
  }

  getCarsByBrandId(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath:string = this.apiUrl + "/Cars/getcardetailsbybrandid?brandId=" + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColourId(colourId:number):Observable<ListResponseModel<Car>>{
    let newPath:string = this.apiUrl + "/Cars/getcardetailsbycolourid?colourId=" + colourId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrandIdAndColourId(brandId:number, colourId:number):Observable<ListResponseModel<Car>>{
    let newPath:string = this.apiUrl + "/Cars/getcardetailsbybrandidandcolourid?brandId=" + brandId
    + "&colourId=" + colourId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarDetailByCarId(carId:number):Observable<ListResponseModel<Car>>{
    let newPath:string = this.apiUrl + "/Cars/getcardetailbycarid?carId=" + carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarDetailsByCustomerId(customerId:number):Observable<ListResponseModel<Car>>{
    let newPath:string = this.apiUrl + "/Cars/getcardetailsbycustomerid?customerId=" + customerId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  add(car:Car):Observable<ResponseModel>{
    let newPath: string = this.apiUrl + "/Cars/add";
    // return this.httpClient.post<ResponseModel>(newPath, car, {withCredentials: true});
    return this.httpClient.post<ResponseModel>(newPath, car);
  }

  delete(car:any):Observable<ResponseModel>{
    let newPath: string = this.apiUrl + "/Cars/delete";
    return this.httpClient.post<ResponseModel>(newPath, car);
  }

  update(car:PlainCar):Observable<ResponseModel>{
    let newPath: string = this.apiUrl + "/Cars/update";
    return this.httpClient.post<ResponseModel>(newPath, car);
  }
}
