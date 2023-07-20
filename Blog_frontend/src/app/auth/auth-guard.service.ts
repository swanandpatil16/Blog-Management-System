import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(): boolean {
      if (!this.isAuthenticated()) {
          this.router.navigate(['/login']);
          return false;
      } else {
          return true;
      }
  }

  isAuthenticated() {
      return (localStorage.getItem("token"));
  }
}
