import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = "https://localhost:5001/api/Customers/";
  constructor(private httpClient: HttpClient) { }

  getCustomers(): Observable<ListResponseModel<Customer>> {
    let newPath = this.apiUrl + "getcustomerdetails";
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }

  getCustomerByEmail(email: string): Observable<ListResponseModel<Customer>> {
    let newPath = this.apiUrl + "getcustomerdetailbyemail?email=" + email;
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }
}
