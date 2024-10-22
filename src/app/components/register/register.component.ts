import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import {  Router } from '@angular/router';

import { FormControl, FormGroup, Validators, } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
repeatPass :string = "none";
isAccountCreated:boolean = false;
displayMsg :string = '';

constructor(private AuthService : AuthService,private router: Router){}


registerForm = new FormGroup({
firstname: new FormControl("",[Validators.required,Validators.pattern("[a-zA-Z]*")]),
lastname: new FormControl("",[Validators.required,Validators.pattern("[a-zA-Z].*")]),
email: new FormControl("",[Validators.required,Validators.email]),
mobile: new FormControl("",[Validators.required,Validators.pattern("[0-9]*"),
Validators.maxLength(12),Validators.minLength(10)]),
gender: new FormControl("",[Validators.required]),
pwd: new FormControl("",[Validators.required,Validators.pattern("[0-9]*"),
  Validators.maxLength(15),Validators.minLength(6)]),
rpwd: new FormControl(""),
});

registerSubmited() {
  if (this.PWD.value == this.RPWD.value) {
    this.repeatPass = 'none';

    // Create the user object using the form values
    const user = {
      firstName: this.FirstName.value,
      lastName: this.LastName.value,
      email: this.Email.value,
      mobile: this.Mobile.value,
      gender: this.Gender.value,
      pwd: this.PWD.value
    };
    // Log user data
    console.log('Sending user object:', user);
    // Call AuthService to register the user
    this.AuthService.registerUser(user).subscribe(res => {
      if (res == 'Success') {
        this.displayMsg = 'Account Created Successfully!';
        this.isAccountCreated = true;
        this.router.navigateByUrl('/login')
      } else if (res == 'AlreadyExist') {
        this.displayMsg = 'Account Already Exists. Try another Email.';
        this.isAccountCreated = false;
      } else {
        this.displayMsg = 'Something went Wrong';
        this.isAccountCreated = false;
      }
    });
 } else {
   this.repeatPass = 'inline';
 }
}
get FirstName(): FormControl {
  return this.registerForm.get("firstname") as FormControl;
}
get LastName(): FormControl{
  return this.registerForm.get("lastname") as FormControl;
}
get Email(): FormControl{
  return this.registerForm.get("email") as FormControl;
}
get Mobile(): FormControl{
  return this.registerForm.get("mobile") as FormControl;
}
get Gender(): FormControl{
  return this.registerForm.get("gender") as FormControl;
}
get PWD(): FormControl{
  return this.registerForm.get("pwd") as FormControl;
}
get RPWD(): FormControl{
  return this.registerForm.get("rpwd") as FormControl;
}

}
