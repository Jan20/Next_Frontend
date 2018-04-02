import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Services
import { UserService } from '../user-service/user.service';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {

  //////////////////
  // Constructors //
  //////////////////
  constructor(
    public userService: UserService
  ) { }

}
