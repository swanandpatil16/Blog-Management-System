import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from '../service/blog-service.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  clientLoginForm = new FormGroup<any>({});

  constructor(
    private router: Router,
    private blogService: BlogService,
    private fb: FormBuilder

  ) {
    const pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; 
    this.clientLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(pattern)]],
      password: [null, Validators.compose([Validators.required, Validators.minLength(8)])]
    });

  }

  signIn(): void {

    const body = {
      "userEmail": this.clientLoginForm.controls['email'].value,
      "userPassword": this.clientLoginForm.controls['password'].value
    }
    console.log("=======>",body);
    this.blogService.clientSignIn(body).pipe(take(1)).subscribe((res :any) => {
      console.log("*****",res);
      if(res && res?.userId){
       // alert("Login sucessful");
        this.blogService.storeAuthorization(res?.userId);
        this.blogService.storeUserRole(res?.role);
        this.blogService.storeLoggedInUserInformation(JSON.stringify(res));
        let userName = '';
        if (res?.userName) {
          userName+=res?.userName;
        }
        this.blogService.storeUserName(userName);
        if (res?.role === 'admin') {
          this.router.navigate(['/admin/home']);
        } else {
          this.router.navigate(['/client/home']);
        }
       
       
      }
    }, err =>{''
      console.log("Error  ",err);
      alert("Something going wrong in login!!pl try again");
    })

  }

  routeToNewUser(): void {
    this.router.navigate(["/register"]);
  }

  routeToForgotPassword(): void {
    this.router.navigate(["/forgot-password"]);
  }
}
