import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { Card } from './../models/card';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../models/responseModel';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CardService {

  apiUrl = environment.apiUrl + "/api/";
  constructor(private httpClient: HttpClient) { }

  addCard(card: Card): Observable<ResponseModel> {
    let newPath: string = this.apiUrl + "Cards/add";
    return this.httpClient.post<ResponseModel>(newPath, card);
  }

  getCardsByUserId(userId: number): Observable<ListResponseModel<Card>> {
    let newPath: string = this.apiUrl + "Cards/getallbyuserid?userId=" + userId;
    return this.httpClient.get<ListResponseModel<Card>>(newPath);
  }
}
