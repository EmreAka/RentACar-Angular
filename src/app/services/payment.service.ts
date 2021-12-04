import { CardToPay } from './../models/cardToPay';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl:string = "https://localhost:5001/api/Payments/pay";
  constructor(private httpClient:HttpClient) { }

  pay(card:CardToPay):Observable<any>{
    return this.httpClient.post<any>(this.apiUrl, card);
  }
}
