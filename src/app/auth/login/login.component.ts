import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Services
import { AuthService } from '../auth/auth.service';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  ///////////////
  // Variables //
  ///////////////
  public email: string;
  public password: string;
  public name: string;
  
  //////////////////
  // Constructors //
  //////////////////
  constructor(
    
    public auth: AuthService
  
  ) { }

}
