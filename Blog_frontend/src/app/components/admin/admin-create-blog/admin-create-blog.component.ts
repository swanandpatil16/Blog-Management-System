import { Component } from '@angular/core';
import { BlogService } from '../../service/blog-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { take } from 'rxjs';
import { Blog } from 'src/app/model/blog.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-create-blog',
  templateUrl: './admin-create-blog.component.html',
  styleUrls: ['./admin-create-blog.component.css']
})
export class AdminCreateBlogComponent {

  getCategoryList: any;
  postId: string = '';
  isEditMode: boolean = false;
  createDate: string = '';
  blogPostForm = new FormGroup<any>({});
 
  constructor(
    private blogService: BlogService,
    private router: Router,
    private datePipe: DatePipe,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.getCategoryList = this.blogService.getCategoryList();
    this.blogPostForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      content: ['', [Validators.required, Validators.minLength(4)]],
      postImage: ['', []],
      category: [0, []]
    });
    this.activateRoute.queryParams.subscribe((res: any) => {
      if (res && res?.id) {
        this.postId = res?.id;
        this.isEditMode = true;
        this.getPostDetailById();
      }
    });
  }

  createBlog(): void {
    if (this.blogPostForm.invalid) {
      return;
    }
    
    const body: any = {
      postTitle: this.blogPostForm.controls['title'].value,
      postContent: this.blogPostForm.controls['content'].value,
      postImage: this.blogPostForm.controls['postImage'].value,
      category: this.blogPostForm.controls['category'].value,
      postCreation: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      postUpdation: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      user: JSON.parse(this.blogService.getLoggedInUserInformation())
    }

    if (!this.isEditMode) {
      this.blogService.createBlog(body).pipe(take(1)).subscribe((res: any) => {
        if (res && res?.status && res?.status === 'success') {
          alert('Blog Added successfully');
          this.router.navigate(['/admin/blog-list'])
        }
      });
    } else {
        this.blogService.updateBlog(body, this.postId, 1).pipe(take(1)).subscribe((res: any) => {
          if (res && res?.status && res?.status === 'success') {
            alert('Blog Updated successfully');
            this.router.navigate(['/admin/blog-list'])
          }
        });
    }
  }

  getPostDetailById(): void {
    this.blogService.getBlogById(this.postId).pipe(take(1)).subscribe((res: any) => {
      if (res && res?.postId) {
        this.blogPostForm.controls['title'].setValue(res?.postTitle);
        this.blogPostForm.controls['content'].setValue(res?.postContent);
        this.blogPostForm.controls['postImage'].setValue(res?.postImage);
        this.blogPostForm.controls['category'].setValue(this.blogService.getCategoryList().find((cate: any) => cate?.name.toString() === res?.category)?.value);
      }
    });
  }
}