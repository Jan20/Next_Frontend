import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap'
import { User } from '../user/user';
import { UserService } from '../user/user.service';


@Injectable()
export class AuthService {
  
  ///////////////
  // Variables //
  ///////////////
  public user: Observable<User>;
  private userId: string;

  constructor(
    
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private userService: UserService,
    private router: Router
            
  ) {
  
    this.user = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          this.userService.setUser(new User(user.uid, user.email, user.photoURL, user.displayName))
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return Observable.of(null)
        }
      })
  }

  ///////////////
  // Functions //
  ///////////////
  public getUser(): Observable<User> {
    return this.user;
  }

  public getUserId(): string {
    return this.userId;
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.userId = credential.user.uid;
        this.updateUserData(credential.user)
    })
  }


  private updateUserData(user) {

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {

      userId: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,

    }
    return userRef.set(data, { merge: true })
  }

  signOut() {

    this.afAuth.auth.signOut().then( () => {
        this.router.navigate(['/']);
    });
  
  }

}
