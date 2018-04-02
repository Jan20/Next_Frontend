import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Services
import { UserService } from '../user-service/user.service';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../user-model/user';
import { AngularFirestore } from 'angularfire2/firestore';
import { MenuService } from '../../menu/menu-service/menu.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {


  ///////////////
  // Variables //
  ///////////////
  public user: User

  //////////////////
  // Constructors //
  //////////////////
  constructor(
    public userService: UserService,
    private angularFireStore: AngularFirestore,
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser()
    this.userService.userSubject.subscribe(user => this.user = user)
  }

}
