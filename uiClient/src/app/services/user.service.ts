import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "/app/profile";
  private urls = {
    register : '/register',
    signin : '/signin',
    details : '/details',
    getCount : '/getUserCount',
    getAllUser : '/getAllUser',
    deleteUser : '/removeUser'
  }
  private isLoggedIn = false;

  httpService;

  constructor(public httpservice : HttpClient, private router:Router, configService : ConfigService ) {
    this.httpService = httpservice;
    this.baseUrl = `${configService.config.apiBaseURL}${this.baseUrl}`
   }

   getAllUsers()
   {
     return this.httpservice.get(`${this.baseUrl}${this.urls.getAllUser}`)
   }

  registerUser(data)
  {
    return this.httpservice.post(`${this.baseUrl}${this.urls.register}`, data);
  }

  signinUser(data)
  {
    return this.httpservice.post(`${this.baseUrl}${this.urls.signin}`, data)
  }

  signoutUser()
  {
    this.router.navigate(['/login']);
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("isAdmin")
  }

  getUserDetails(userId)
  {
    return this.httpservice.get(`${this.baseUrl}${this.urls.details}/${userId}`);
  }

  setIsLoggedIn(value)
  {
    this.isLoggedIn = value
  }

  getIsLoggedIn()
  {
    console.log(this.isLoggedIn)
    return this.isLoggedIn
  }

  getUserCount()
  {
    return this.httpservice.get(`${this.baseUrl}${this.urls.getCount}`);
  }

  deleteUser(id)
  {
    return this.httpService.delete(`${this.baseUrl}${this.urls.deleteUser}/${id}`)
  }
}
