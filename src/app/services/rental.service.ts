import {Rental} from './../models/rental';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ListResponseModel} from '../models/listResponseModel';
import {ResponseModel} from "../models/responseModel";

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = "https://localhost:44384/api/";

  constructor(private httpClient: HttpClient) {
  }

  getRentals(): Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + "Rentals/getdetails";
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  checkIfCarIsAvailable(carId: number, rentDate: string, returnDate: string): Observable<any> {
    let newPath = this.apiUrl + `Rentals/checkifcarisavailable?carId=${carId}&rentDate=${rentDate}&returnDate=${returnDate}`;
    return this.httpClient.get<any>(newPath);
  }

  addRental(rental: any): Observable<any> {
    let newPath = this.apiUrl + "Rentals/add";
    return this.httpClient.post<any>(newPath, rental);
  }

  delete(rental: any): Observable<ResponseModel> {
    let newPath = this.apiUrl + "Rentals/delete";
    return this.httpClient.post<ResponseModel>(newPath, rental);
  }
}
