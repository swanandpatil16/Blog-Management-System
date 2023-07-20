import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../service/blog-service.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  userName: string = "";
  userPassword: string = "";
  userEmail: string = "";
  dob: string = "";
  about: string = "";

  constructor(
    
    private router: Router,
    private datePipe: DatePipe,
    private blogService: BlogService

  ) { }

  setDOB(ev: any): void {
    const date: any = this.datePipe.transform(ev?.value, 'yyyy-MM-dd');
    this.dob = date;
  }


  signup(): void {
    if (this.userName === '' || this.userName.length < 3) {
      alert('UserName must contain atleast 3 characters');
      return;
    }
    
   
    
//alert("sucess")
    const body: any = {
      userName: this.userName,
      userPassword: this.userPassword,
      userEmail: this.userEmail,
      dob: this.dob,
      about: this.about,
      role: "user"
    }
    console.log("=======>",body);
    this.blogService.signUp(body).pipe(take(1)).subscribe((res :any) => {
      console.log("*****",res);
      if (res && res?.status && res?.status === "success") {
        alert("Registration sucessful");
        this.router.navigate(["/login"]);
      }
    }, err =>{
      console.log("Error  ",err);
      alert("Something going wrong!!pl try again");
    })

  }
}
