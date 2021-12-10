import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "https://localhost:5001/api/";
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newPath:string = this.apiUrl + "Cars/getcardetails";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrandId(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath:string = this.apiUrl + "Cars/getcardetailsbybrandid?brandId=" + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColourId(colourId:number):Observable<ListResponseModel<Car>>{
    let newPath:string = this.apiUrl + "Cars/getcardetailsbycolourid?colourId=" + colourId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrandIdAndColourId(brandId:number, colourId:number):Observable<ListResponseModel<Car>>{
    let newPath:string = this.apiUrl + "Cars/getcardetailsbybrandidandcolourid?brandId=" + brandId
    + "&colourId=" + colourId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarDetailByCarId(carId:number):Observable<ListResponseModel<Car>>{
    let newPath:string = this.apiUrl + "Cars/getcardetailbycarid?carId=" + carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  add(car:Car):Observable<ResponseModel>{
    let newPath: string = this.apiUrl + "Cars/add";
    return this.httpClient.post<ResponseModel>(newPath, car);
  }
}
