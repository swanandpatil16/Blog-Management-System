import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { ClientHomeComponent } from './components/client/client-home/client-home.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { BlogListComponent } from './shared/blog-list/blog-list.component';
import { BlogDetailComponent } from './shared/blog-detail/blog-detail.component';
import { AdminCreateBlogComponent } from './components/admin/admin-create-blog/admin-create-blog.component';

const routes: Routes = [
  
  
  { path: 'register', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'blog-list', component: BlogListComponent
  },
  {
    path: 'client', children: [
      { path: 'home', component: ClientHomeComponent, canActivate: [AuthGuardService] },
      {path: 'blog-detail/:id', component: BlogDetailComponent, canActivate: [AuthGuardService]},
      {
        path: 'blog-list', component: BlogListComponent
      }
    ]
  },
  {
    path: 'admin', children: [
      { path: 'home', component: AdminHomeComponent, canActivate: [AuthGuardService] },
      {path: 'blog-detail/:id', component: BlogDetailComponent, canActivate: [AuthGuardService]},
      {
        path: 'blog-list', component: BlogListComponent
      },
      { path: 'create-blog', component: AdminCreateBlogComponent, canActivate: [AuthGuardService] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
