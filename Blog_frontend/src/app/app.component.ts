import { Component } from '@angular/core';
import { BlogService } from './components/service/blog-service.service';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoggedIn: boolean = false;
  isAdminLoggedIn: boolean = false;


  constructor(
    private blogService: BlogService,
    private router: Router
  ){
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe((event: any) => {
      const role =  this.blogService.getUserRole();
      console.log('#####', role)
      if (role !== null && role === "user") {
        setTimeout(() => {
          this.isLoggedIn = true;
          this.isAdminLoggedIn = false;
        }, 100);
      } else {
        if (role !== null && role === "admin") {
          setTimeout(() => {
            this.isAdminLoggedIn = true;
            this.isLoggedIn = false;
          }, 100);

        } {
          setTimeout(() => {
            this.isLoggedIn = false;
            this.isAdminLoggedIn = false;
          }, 1);
        }
      }
    });
//line 20 to 41-->check when routing(url) change it will check authorization
  }
}
