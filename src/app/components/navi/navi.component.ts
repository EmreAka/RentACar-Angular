import {LocalStorageService} from './../../services/local-storage.service';
import {AuthService} from './../../services/auth.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({opacity: 0})),
      transition('void => *, * => void', [
        animate(1000)
      ])
    ])
  ]
})
export class NaviComponent implements OnInit {

  isSignInButtonActive = false;
  isSignUpButtonActive = false;

  isMouseOverSignIn = false;
  isMouseOverSignUp = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              public authService: AuthService, private localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.authService.getUserDetailsFromToken();
    }
    if (this.isTokenExpired()){
      this.localStorageService.delete('token');
    }
  }

  setCurrentRouteToLogin() {
    this.router.navigate(["login"]);
    this.isSignInButtonActive = true;
    this.isSignUpButtonActive = false;
  }

  setCurrentRouteToRegister() {
    this.router.navigate(["register"]);
    this.isSignUpButtonActive = true;
    this.isSignInButtonActive = false;
  }

  setCurrentRouteToProfile() {
    this.router.navigate(["profile"]);
  }

  setCurrentRouteToFavorite() {
    this.router.navigate(["favoritecars"]);
  }

  setCurrentRouteToMyCars() {
    this.router.navigate(["mycars"]);
  }

  getSignInButtonClass() {
    if (this.isSignInButtonActive || this.isMouseOverSignIn) {
      return "btn btn-light";
    } else {
      return "btn btn-dark";
    }
  }

  getSignUpButtonClass() {
    if (this.isSignUpButtonActive || this.isMouseOverSignUp) {
      return "btn btn-light"
    } else {
      return "btn btn-dark"
    }
  }

  logout() {
    this.authService.logout();
  }

  isLoggedIn() {
    return this.authService.isAuthenticated();
  }

  isTokenExpired(){
    if (this.authService.isTokenExpired()){
      return true;
    }else {
      return false;
    }
  }

  setCurrentRouteToRentals() {
    this.router.navigate(["/rentals"]);
  }

  setMouseIsOverSignIn() {
    this.isMouseOverSignIn = true;
  }

  setMouseIsIverSignUp() {
    this.isMouseOverSignUp = true;
  }

  setMouseIsNotOverSignIn() {
    this.isMouseOverSignIn = false;
  }

  setMouseIsNotOverSignUp() {
    this.isMouseOverSignUp = false;
  }
}
