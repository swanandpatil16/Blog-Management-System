import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { BlogService } from 'src/app/components/service/blog-service.service';
import { Blog } from 'src/app/model/blog.model';
import { AddCommentComponent } from '../add-comment/add-comment.component';
import { MatDialog } from '@angular/material/dialog';
import { Comment } from 'src/app/model/comment.model';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent {
  id: any;
  blog: Blog | undefined | null;
  commentList: Array<Comment> = [];
  isAdmin: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService,
    private dialog: MatDialog,
    private router: Router
  ) {
    activatedRoute?.params.subscribe((res: any) => {
      if (!!res && res?.id) {
        this.id = res?.id;
        this.isAdmin = this.blogService.getUserRole() === 'admin' ? true : false;
        this.getBlogById();
        this.getCommentByBlogId();
      }
    });
  }

  getBlogById() {
    this.blogService.getBlogById(this.id).pipe(take(1)).subscribe((res: any) => {
      console.log('>>>>>>>>', res);
      if (!!res && res?.postId) {
        this.blog = res;
      }
    })
  }

  onReactionPress(reaction: string): void {
    if (reaction === 'favorite') {
      if (this.blog) {
        this.blog.favorite += 1;
        this.updateBlog();
      }
    } else if (reaction === 'thumb_up') {
      if (this.blog) {
        this.blog.postlike += 1;
        this.updateBlog();
      }
    } else if (reaction === 'thumb_down') {
      if (this.blog) {
        this.blog.disLike += 1;
        this.updateBlog();
      }
    }
  }

  updateBlog(): void {
    this.blogService.updateBlog(this.blog, this.blog?.postId, 1).pipe(take(1)).subscribe((res: any) => {
      console.log('>>>>>', res);
    });
  }

  openCommentDialog(): void {
    const dlg = this.dialog.open(AddCommentComponent, {
      data: {},
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '80%',
      width: '80%'
    });
    dlg.afterClosed().subscribe((res: any) => {
      if (!!res) {
        const content = res?.content;
        console.log('>>>>', content)
        if (content === '') {
          alert('Blank comment not allowed');
        } else {
          const userId = this.blogService.getAuthorization();
          const body: any = {
            content: content
          };
          this.blogService.addCommentToBlog(body, this.blog?.postId, userId).pipe(take(1)).subscribe((resp: any) => {
            if (!!resp && resp?.status && resp?.status === 'success') {
              this.getCommentByBlogId();
              alert('Comment Added Successfully');
            }
          });
        }
      }
    });
  }

  getCommentByBlogId(): void {
    this.blogService.getCommentByBlogId(this.id).pipe(take(1)).subscribe((res: any) => {
      if (res) {
        this.commentList = res;
      }
    });
  }

  deleteBlog(): void {
    this.blogService.deleteBlogById(this.blog?.postId).pipe(take(1)).subscribe((res => {
      if (res && res?.status && res?.status === 'success') {
        alert('Blog deleted successfully...');
        const role = this.blogService.getUserRole();
        if (res?.role === 'admin') {
          this.router.navigate(['/admin/blog-list']);
        } else {
          this.router.navigate(['/client/blog-list']);
        }
      }
    }));
  }

  updateBlogPost(): void {
    this.router.navigate(['/admin/create-blog'], {
      queryParams: {
        id: this.blog?.postId
      }
    });
  }
}
