import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ListResponseModel} from "../models/listResponseModel";

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  apiUrl: string = "https://localhost:5001/api/";

  constructor(private httpClient: HttpClient) { }

  getFavoriteDetailsByUserId(userId: number): Observable<ListResponseModel<any>>{
    let newPath: string = this.apiUrl + "Favorites/getfavoritedetailsbyuserid?userId=" + userId;
    return this.httpClient.get<ListResponseModel<any>>(newPath);
  }
}
