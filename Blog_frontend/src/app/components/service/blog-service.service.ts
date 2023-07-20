import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  url: string = 'http://localhost:9070';


category: any = [{
  name: "INFORMATION" , value: 0,
}, {
  name: "SPORTS", value: 1,
}, {
  name: "FUN", value: 2
}, {
  name: "DEVOTIONAL", value:  3
}, {
  name: "POLITICS", value:  4
}, {
  name: "JOBS", value:  5
}
];

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  /* Client Registeration */
  signUp(body: any): Observable<any> {
    return this.http.post(this.url + "/api/blog/signup", body);
  }
  //client login
  clientSignIn(body: any): Observable<any> {

    return this.http.post(this.url + "/api/blog/login", body );
  }

  storeAuthorization(token: string): void {
    localStorage.setItem("token", token);
  }

  // This is userId
  getAuthorization(): any {
    const token = localStorage.getItem("token");
    return token;
  }

  storeUserName(name: string): void {
    localStorage.setItem("userName", name);
  }

  getUserName(): any {
    const name = localStorage.getItem("userName");
    return name;
  }

  userLogout(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }

  storeUserRole(role: string): void {
    localStorage.setItem("role", role);
  }

  getUserRole(): any {
    const role = localStorage.getItem("role");
    return role;
  }

  getAllBlogList(): Observable<any> {
    return this.http.get(this.url + "/api/blog/posts");
  }

  getBlogById(id: any): Observable<any> {
    return this.http.get(this.url + "/api/blog/post/"+id);
  }

  updateBlog(body: any, blogId: any, categoryId: any): Observable<any> {
    return this.http.put(this.url + "/api/blog/post/"+blogId+"/"+ categoryId, body);
  }

  addCommentToBlog(body: any, blogId: any, userId: any): Observable<any> {
    return this.http.post(this.url + "/api/blog/comment/"+blogId+"/"+ userId, body);
  }

  getCommentByBlogId(id: any): Observable<any> {
    return this.http.get(this.url + "/api/blog/comment/"+id);
  }

  deleteBlogById(id: any): Observable<any> {
    return this.http.delete(this.url + "/api/blog/post/"+id);
  }

  getCategoryList(): any {
    return this.category;
  }

  storeLoggedInUserInformation(user: any): void {
    localStorage.setItem('user', user);
  }

  getLoggedInUserInformation(): any {
    return localStorage.getItem('user');
  }

  createBlog(body: any): Observable<any> {
    return this.http.post(this.url + "/api/blog/post/", body);
  }

}
