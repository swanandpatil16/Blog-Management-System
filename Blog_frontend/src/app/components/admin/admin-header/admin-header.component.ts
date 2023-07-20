import { ChangeDetectorRef, Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { BlogService } from '../../service/blog-service.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {
  url: string = '';
  userName: string = '';
  constructor(
   private blogService: BlogService,
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

  ngOnInit(): void {
    
  }


  routerToLink(link: string): void {
    if (link === '/admin/logout') {
     this.blogService.userLogout();
      return;
    }
    this.router.navigate([link]);
  }

}
