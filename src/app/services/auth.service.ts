import { LoginComponent } from './../components/login/login.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  currentUser:BehaviorSubject<any>= new BehaviorSubject(null);
  
  baseServerUrl = "https://localhost:7075/api/User/";
  jwtHelperservice = new JwtHelperService();

  registerUser(user: any): Observable<any> {
    return this.http.post(this.baseServerUrl + "CreateUser", {
       FirstName: user.firstName,  // Ensure this matches C# model
       LastName: user.lastName,    // Ensure this matches C# model
       Email: user.email,          // Ensure this matches C# model
       Mobile: user.mobile,        // Ensure this matches C# model
       Gender: user.gender,        // Ensure this matches C# model
       Pwd: user.pwd               // Ensure this matches C# model
    },
    { responseType: 'text' });
 }
 
 loginUser(logInfo: any): Observable<any>{
  return this.http.post(this.baseServerUrl + "LoginUser",{
    Email:logInfo[0], 
    Pwd: logInfo[1],
  },
  { responseType: 'text' }
);
 }
 setToken(token:string){
  localStorage.setItem("access_token",token);
  this.loadCurrentUser();
}
loadCurrentUser(){
const token= localStorage.getItem("access_token");
const userInfo = token!=null? this.jwtHelperservice.decodeToken(token):null;
const data = userInfo?{
  id: userInfo.id,
  fistname:userInfo.firstname,
  lastname:userInfo.lastname,
  email:userInfo.email,
  mobile:userInfo.mobile,
  gender:userInfo.gender,
}:null;
this.currentUser.next(data);
}
isLoggedin(): boolean {
  if (typeof window !== 'undefined' && localStorage) {
    return !!localStorage.getItem("access_token");  
  }
  return false;  
}

removeToken(){
  localStorage.removeItem("access_token")
}
}
