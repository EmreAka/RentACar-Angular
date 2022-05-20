import {LocalStorageService} from './local-storage.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {RegisterModel} from './../models/registerModel';
import {Observable} from 'rxjs';
import {TokenModel} from './../models/tokenModel';
import {SingleResponseModel} from './../models/singleResponseModel';
import {LoginModel} from './../models/loginModel';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {DecodedToken} from "../models/decodedToken";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiUrl + "/Auth/";
  decodedToken: DecodedToken = {Token: "", DecodedToken: "", Expiration: 0, Email: "", Name: "", Role: "", Roles: [], UserId: 0};

  constructor(private httpClient: HttpClient, private jwtHelperService: JwtHelperService,
              private localStorageService: LocalStorageService) {
  }

  login(login: LoginModel): Observable<SingleResponseModel<TokenModel>> {
    // return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "login", login, {withCredentials: true});
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "login", login);
  }

  logout() {
    this.localStorageService.delete('token');
    this.localStorageService.delete('user');
  }

  register(register: RegisterModel): Observable<SingleResponseModel<TokenModel>> {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "register", register);
  }

  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  isTokenExpired(): boolean {
    if (new Date(this.decodedToken['Expiration'] * 1000) < new Date()  || this.decodedToken['Expiration'] == undefined
      || this.decodedToken['Expiration'] == null) {
      console.log("token exp date: " + new Date(this.decodedToken['Expiration'] * 1000))
      console.log("date: " + new Date())
      console.log("boolean: " + (new Date(this.decodedToken['Expiration'] * 1000) < new Date()));
      return true;
      this.localStorageService.delete('token');
    } else {
      return false
    }
  }

  getUserDetailsFromToken() {
    const token: any = this.localStorageService.get('token');
    const decodedToken = this.jwtHelperService.decodeToken(token);
    this.decodedToken['Token'] = this.localStorageService.get('token');
    this.decodedToken['DecodedToken'] = this.jwtHelperService.decodeToken(token);
    this.decodedToken['Expiration'] = +decodedToken['exp'];
    this.decodedToken['Name'] = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    this.decodedToken['Role'] = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    this.decodedToken['Roles'] = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    this.decodedToken['Email'] = decodedToken['email'];
    this.decodedToken['UserId'] = parseInt(decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
  }
}
