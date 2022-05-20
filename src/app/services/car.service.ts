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

  addWithImages(files: any, car: any): Observable<any>{
    const formData = new FormData();

    for (let i = 0; i < files.length; i++){
      formData.append("carForAddDto.Images", files[i]);
    }
    formData.append("carForAddDto.UserId", JSON.stringify(car.userId));
    formData.append("carForAddDto.BrandId", JSON.stringify(car.brandId));
    formData.append("carForAddDto.ColourId", JSON.stringify(car.colourId));
    formData.append("carForAddDto.EngineId", JSON.stringify(car.engineId));
    formData.append("carForAddDto.FuelId", JSON.stringify(car.fuelId));
    formData.append("carForAddDto.ModelYear", JSON.stringify(car.modelYear));
    formData.append("carForAddDto.FuelConsumption", JSON.stringify(car.fuelConsumption));
    formData.append("carForAddDto.DoorNumber", JSON.stringify(car.doorNumber));
    formData.append("carForAddDto.DailyPrice", JSON.stringify(car.dailyPrice));
    formData.append("carForAddDto.Description", car.description);

    return this.httpClient.post(this.apiUrl + "/Cars/addWithImages", formData);
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
