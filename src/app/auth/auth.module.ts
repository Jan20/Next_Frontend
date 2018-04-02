import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

// Login
import { LoginComponent } from './login/login.component';

// Auth
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';

import { UserService } from './user/user.service';

@NgModule({
  imports: [ 
    
    CommonModule,
    AngularFireAuthModule,
    AngularFirestoreModule
  
  ],
  declarations: [

    LoginComponent

  ],
  providers: [
    
    AuthService,
    AuthGuard,
    UserService

  ],
  exports: [


  ]
})
export class AuthModule { }
