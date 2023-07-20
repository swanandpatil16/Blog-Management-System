import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { BlogService } from '../../service/blog-service.service';

@Component({
  selector: 'app-client-header',
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.css']
})
export class ClientHeaderComponent {
  url: string = "/client/home";
  userName: string = '';
  constructor(
    private blogService : BlogService,
    private router:Router
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe((event: any) => {
      this.url = event?.url;
    });
    if (this.blogService.getUserName() !== null) {
      this.userName = this.blogService.getUserName();
    }
  }


  routerToLink(link: string): void {
    if (link === '/client/logout') {
     this.blogService.userLogout();
      return;
    }
    this.router.navigate([link]);
  }

}
