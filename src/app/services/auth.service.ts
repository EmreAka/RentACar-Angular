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
  
  fullName: string;
  email: string;
  roles: string[];
  role: string;
  userId: number;

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

  getUserDetailsFromToken(){
    let token: any = this.localStorageService.get('token');
    let decodedToken = this.jwtHelperService.decodeToken(token);
    this.fullName = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    this.role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    this.roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    this.email = decodedToken['email'];
    this.userId = parseInt(decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
  }
}
