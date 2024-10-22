import {  Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  {

  constructor(private loginAuth : AuthService,private router: Router){}
loginForm = new FormGroup({
  email: new FormControl("",[Validators.required,Validators.email]),
  pwd: new FormControl("",[Validators.required,Validators.minLength(6),Validators.maxLength(15)])
});

isUserValid: boolean = false;

  LoginSubmitted() {
    const email = this.loginForm.value.email;
    const pwd = this.loginForm.value.pwd;
    

    if (email && pwd) {  // Ensure email and pwd are not null or undefined
      this.loginAuth.loginUser([email, pwd])
        .subscribe(res => {
          if (res == 'Failure') {
            this.isUserValid = false;
            alert('Login Unsuccessful');
          } else {
            this.isUserValid = true;
           // alert('Login Successful');
          this.loginAuth.setToken(res);
          this.router.navigateByUrl('/home')
          }
        });
    }
}

get Email(): FormControl{
  return this.loginForm.get("email") as FormControl;
}
get PWD(): FormControl{
  return this.loginForm.get("pwd") as FormControl;
}
}

