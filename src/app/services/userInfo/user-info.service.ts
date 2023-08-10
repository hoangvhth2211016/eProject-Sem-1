import { Injectable } from '@angular/core';
import { UserInfo } from 'src/app/models/UserInfo/user-info.model';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  user!: UserInfo;
  constructor() {
    this.user = this.getUserInfo();
  }

  // get user information
  getUserInfo(): UserInfo {
    const userInfoJson = localStorage.getItem('user');
    return (userInfoJson) ? JSON.parse(userInfoJson) : new UserInfo('', '', '', '', '', '', '', '', '', '', '', '', '');
  }

  // set user information
  setUserInfo() {
    const userInfoJson = JSON.stringify(this.user);
    localStorage.setItem('user', userInfoJson);

  }

  // add a new user
  addUser(fname: string, lname: string, tel: string, email: string, add: string, city: string, country: string, pc: string, cholder: string, cnm: string, mon: string, year: string, cvv: string) {
    this.user = new UserInfo(fname, lname, tel, email, add, city, country, pc, cholder, cnm, mon, year, cvv);
    this.setUserInfo();
  }

  // remove user
  removeUser() {
    this.user = new UserInfo('', '', '', '', '', '', '', '', '', '', '', '', '');
    this.setUserInfo();
  }
}
