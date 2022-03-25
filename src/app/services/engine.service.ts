import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ListResponseModel} from "../models/listResponseModel";
import {Engine} from "../models/engine";

@Injectable({
  providedIn: 'root'
})
export class EngineService {

  apiUrl: string = "https://localhost:5001/api/";

  constructor(private httpClient: HttpClient) { }

  getEngines(): Observable<ListResponseModel<Engine>>{
    const newPath: string = this.apiUrl + "engines/getall";
    return this.httpClient.get<ListResponseModel<Engine>>(newPath);
  }
}
