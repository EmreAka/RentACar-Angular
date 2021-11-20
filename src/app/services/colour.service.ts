import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColourResponseModel } from '../models/colourResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColourService {

  apiUrl = "https://localhost:44384/api/Colours/getall"
  constructor(private httpClient:HttpClient) { }
  
  getColours():Observable<ColourResponseModel>{
    return this.httpClient.get<ColourResponseModel>(this.apiUrl);
  }
}
