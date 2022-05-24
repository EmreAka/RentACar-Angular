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
  //http://localhost:5000/api/Cards/add
  apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  addCard(card: Card): Observable<ResponseModel> {
    let newPath: string = this.apiUrl + "/Cards/add";
    return this.httpClient.post<ResponseModel>(newPath, card);
  }

  getCardsByUserId(): Observable<ListResponseModel<Card>> {
    let newPath: string = this.apiUrl + "/Cards/getallbyuserid";
    return this.httpClient.get<ListResponseModel<Card>>(newPath);
  }
}
