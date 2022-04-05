import { CardToPay } from './../models/cardToPay';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl:string = "https://localhost:44384/api/Payments/pay";
  constructor(private httpClient:HttpClient) { }

  pay(card: CardToPay, carId: number):Observable<any>{
    let newPath = this.apiUrl + "?carId=" + carId;
    return this.httpClient.post<any>(newPath, card);
  }
}
