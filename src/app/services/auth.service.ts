import { LocalStorageService } from './local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RegisterModel } from './../models/registerModel';
import { Observable } from 'rxjs';
import { TokenModel } from './../models/tokenModel';
import { SingleResponseModel } from './../models/singleResponseModel';
import { LoginModel } from './../models/loginModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "https://localhost:5001/api/Auth/";

  constructor(private httpClient: HttpClient, private jwtHelperService: JwtHelperService, 
    private localStorageService: LocalStorageService) { }

  login(login: LoginModel): Observable<SingleResponseModel<TokenModel>>{
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "login", login);
  }

  logout(){
    this.localStorageService.delete('token');
    this.localStorageService.delete('user');
  }

  register(register: RegisterModel): Observable<SingleResponseModel<TokenModel>>{
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "register", register);
  }

  isAuthenticated(){
    if (localStorage.getItem('token')) {
      return true;
    }
    else {
      return false;
    }
  }
}