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

  loggedIn = false;

  constructor(private httpClient: HttpClient, private jwtHelperService: JwtHelperService) { }

  login(login: LoginModel): Observable<SingleResponseModel<TokenModel>>{
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "login", login);
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

  isLoggedIn(){
    return this.loggedIn;
  }
}
