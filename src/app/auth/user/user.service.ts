import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable()
export class UserService {

  ///////////////
  // Variables //
  ///////////////
  private user: User = new User('bihhc6mTKZbZXmJ7Sf9e7mSriQ53','','','')

  //////////////////
  // Constructors //
  //////////////////
  constructor() { }

  /////////////
  // Getters //
  /////////////
  public getUser(): User {

    return this.user;

  }

  /////////////
  // Setters //
  /////////////
  public setUser(user: User): void {

    this.user = user;

  }

}
