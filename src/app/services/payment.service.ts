import { CardToPay } from './../models/cardToPay';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl:string = environment.apiUrl + "/Payments/pay";
  constructor(private httpClient:HttpClient) { }

  pay(card: CardToPay, carId: number):Observable<any>{
    let newPath = this.apiUrl + "?carId=" + carId;
    console.log(newPath)
    return this.httpClient.post<any>(newPath, card);
  }
}
