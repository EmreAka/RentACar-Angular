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

  userString: any;
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private authService: AuthService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
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

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  getUserName(){
    this.userString = this.localStorageService.get('user');
    let userObject = JSON.parse(this.userString); 
    return userObject.firstName + " " + userObject.lastName;
  }
}
