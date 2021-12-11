import { SingleResponseModel } from './../models/singleResponseModel';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Colour } from '../models/colour';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColourService {

  apiUrl = "https://localhost:5001/api/"
  constructor(private httpClient:HttpClient) { }
  
  getColours():Observable<ListResponseModel<Colour>>{
    let newPath: string = this.apiUrl + "Colours/getall";
    return this.httpClient.get<ListResponseModel<Colour>>(newPath);
  }

  getColourById(colourId: number):Observable<SingleResponseModel<Colour>>{
    let newPath: string = this.apiUrl + "Colours/getbyid?id=" + colourId;
    return this.httpClient.get<SingleResponseModel<Colour>>(newPath);
  }

  add(colour:Colour):Observable<ResponseModel>{
    let newPath: string = this.apiUrl + "Colours/add";
    return this.httpClient.post<ResponseModel>(newPath, colour);
  }

  update(colour: Colour):Observable<ResponseModel>{
    let newPath: string = this.apiUrl + "Colours/update";
    return this.httpClient.post<ResponseModel>(newPath, colour);
  }
}
