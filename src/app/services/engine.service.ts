import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ListResponseModel} from "../models/listResponseModel";
import {Engine} from "../models/engine";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EngineService {

  apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getEngines(): Observable<ListResponseModel<Engine>>{
    const newPath: string = this.apiUrl + "/engines/getall";
    return this.httpClient.get<ListResponseModel<Engine>>(newPath);
  }
}
