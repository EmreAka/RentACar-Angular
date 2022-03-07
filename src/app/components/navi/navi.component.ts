import { LocalStorageService } from './../../services/local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  isSignInButtonActive = false;
  isSignUpButtonActive = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    public authService: AuthService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.authService.getUserDetailsFromToken();
    }
  }

  setCurrentRouteToLogin(){
    this.router.navigate(["login"]);
    this.isSignInButtonActive = true;
    this.isSignUpButtonActive = false;
  }

  setCurrentRouteToRegister(){
    this.router.navigate(["register"]);
    this.isSignUpButtonActive = true;
    this.isSignInButtonActive = false;
  }

  setCurrentRouteToProfile(){
    this.router.navigate(["profile"]);
  }

  setCurrentRouteToMyCars(){
    this.router.navigate(["mycars"]);
  }

  getSignInButtonClass(){
    if (this.isSignInButtonActive) {
      return "btn btn-primary";
    }
    else {
      return "btn btn-light";
    }
  }

  getSignUpButtonClass(){
    if (this.isSignUpButtonActive) {
      return "btn btn-primary"
    }
    else {
      return "btn btn-light"
    }
  }

  logout(){
    this.authService.logout();
  }

  isLoggedIn(){
    return this.authService.isAuthenticated();
  }
}
