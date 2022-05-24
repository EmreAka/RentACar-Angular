import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ListResponseModel} from "../models/listResponseModel";
import {ResponseModel} from "../models/responseModel";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getFavoriteDetailsByUserId(): Observable<ListResponseModel<any>>{
    let newPath: string = this.apiUrl + "/Favorites/getfavoritedetailsbyuserid";
    return this.httpClient.get<ListResponseModel<any>>(newPath);
  }

  getFavoritesByUserId(): Observable<ListResponseModel<any>>{
    let newPath: string = this.apiUrl + "/Favorites/getfavoritesbyuserid";
    return  this.httpClient.get<ListResponseModel<any>>(newPath);
  }

  addFavorite(favorite: any): Observable<ResponseModel>{
    let newPath: string = this.apiUrl + "/Favorites/addFavorite";
    return this.httpClient.post<ResponseModel>(newPath, favorite);
  }

  deleteFavorite(favorite: any): Observable<ResponseModel>{
    let newPath: string = this.apiUrl + "/Favorites/deletefavorite";
    return this.httpClient.post<ResponseModel>(newPath, favorite);
  }
}
