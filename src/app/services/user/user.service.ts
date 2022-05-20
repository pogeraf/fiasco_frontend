import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private name: string = localStorage.getItem('username') || '';

  public get userName(): string {
    return this.name;
  }
  public set userName(user: string) {
    this.name = user;
    localStorage.setItem('username', user);
  }
  constructor() {}
}
