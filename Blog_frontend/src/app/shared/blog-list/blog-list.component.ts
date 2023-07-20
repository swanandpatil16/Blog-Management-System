import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { BlogService } from 'src/app/components/service/blog-service.service';
import { Blog } from 'src/app/model/blog.model';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent {

  blogList: Array<Blog> = [];

  constructor(
    private blogService: BlogService,
    private route: Router
  ) {
   this.getAllBlogList();
  }

  getAllBlogList(): void {
    this.blogService.getAllBlogList().pipe(take(1)).subscribe((res: any) => {
      if (!!res && res.length > 0) {
        this.blogList = res;
        console.log('>>>>', res)
      }
    });
  }

  openBlogDetail(blog: Blog): void {
    if (this.blogService.getUserRole() === 'user') {
      this.route.navigate(['/client/blog-detail/'+ blog?.postId]);
    } else {
      this.route.navigate(['/admin/blog-detail/'+ blog?.postId]);
    }
   
  }
}
