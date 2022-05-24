import { ResponseModel } from './../models/responseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = environment.apiUrl + "/Customers/";
  constructor(private httpClient: HttpClient) { }

  getCustomers(): Observable<ListResponseModel<Customer>> {
    let newPath = this.apiUrl + "getcustomerdetails";
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }

  getCustomerByEmail(): Observable<ListResponseModel<Customer>> {
    let newPath = this.apiUrl + "getcustomerdetailbyemail";
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }

  updateCustomerDetails(customer: Customer): Observable<ResponseModel> {
    let newPath = this.apiUrl + "updatedetails";
    return this.httpClient.post<ResponseModel>(newPath, customer);
  }
}
