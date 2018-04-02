import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

// Login
import { UserLoginComponent } from './user-login/user-login.component';

// Services
import { UserService } from './user-service/user.service';

@NgModule({
  imports: [ 
    CommonModule,
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  declarations: [
    UserLoginComponent
  ],
  providers: [
    UserService,
  ],
  exports: [
  ]
})
export class UserModule { }
