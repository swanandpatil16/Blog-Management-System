import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminHeaderComponent } from './components/admin/admin-header/admin-header.component';
import { AdminCreateBlogComponent } from './components/admin/admin-create-blog/admin-create-blog.component';
import { ClientHeaderComponent } from './components/client/client-header/client-header.component';
import { ClientHomeComponent } from './components/client/client-home/client-home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import { BlogListComponent } from './shared/blog-list/blog-list.component';
import { BlogDetailComponent } from './shared/blog-detail/blog-detail.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDialogModule} from '@angular/material/dialog';
import { AddCommentComponent } from './shared/add-comment/add-comment.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppHeaderComponent,
    AdminHomeComponent,
    AdminHeaderComponent,
    AdminCreateBlogComponent,
    ClientHeaderComponent,
    ClientHomeComponent,
    SignupComponent,
    LoginComponent,
    BlogListComponent,
    BlogDetailComponent,
    AddCommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatRippleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatMenuModule,
    MatIconModule,
    MatSnackBarModule,
    MatButtonModule,
    MatBadgeModule,
    MatDialogModule
  ],
  providers: [DatePipe],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
