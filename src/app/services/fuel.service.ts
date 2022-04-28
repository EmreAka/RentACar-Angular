import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ListResponseModel} from "../models/listResponseModel";
import {Fuel} from "../models/fuel";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FuelService {

  apiUrl: string = environment.apiUrl

  constructor(private httpClient: HttpClient) { }

  getFuels(): Observable<ListResponseModel<Fuel>>{
    const newPath: string = this.apiUrl + "/fuels/getall";
    return this.httpClient.get<ListResponseModel<Fuel>>(newPath);
  }
}
