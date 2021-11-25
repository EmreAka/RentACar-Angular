import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Colour } from '../models/colour';
import { ListResponseModel } from '../models/ListResponsemodel';

@Injectable({
  providedIn: 'root'
})
export class ColourService {

  apiUrl = "https://localhost:5001/api/Colours/getall"
  constructor(private httpClient:HttpClient) { }
  
  getColours():Observable<ListResponseModel<Colour>>{
    return this.httpClient.get<ListResponseModel<Colour>>(this.apiUrl);
  }
}
