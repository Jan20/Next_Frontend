import { Injectable, AnimationKeyframe } from '@angular/core'
import { Router } from '@angular/router'
import * as firebase from 'firebase/app'
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/switchMap'
import { User } from '../user-model/user'

@Injectable()
export class UserService {
  
  ///////////////
  // Variables //
  ///////////////
  public userObervable: Observable<User>
  public user: User = new User('bihhc6mTKZbZXmJ7Sf9e7mSriQ53','','','')

  //////////////////
  // Constructors //
  //////////////////
  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFireStore: AngularFirestore,
    private router: Router
  ) {
    this.userObervable = this.angularFireAuth.authState.switchMap(user => {
      if (user) {
        this.user = new User(user.uid, user.email, user.photoURL, user.displayName)
        return this.angularFireStore.doc<User>(`users/${user.uid}`).valueChanges()
      } else {
        return Observable.of(null)
      }
    })
  }

  ///////////////
  // Functions //
  ///////////////
  public googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider)
  }

  private oAuthLogin(provider) {
    return this.angularFireAuth.auth.signInWithPopup(provider).then((credential) => {
        this.updateUserData(credential.user)
    })
  }

  private updateUserData(user) {
    console.log('_______________________________________________')
    console.log(user)
    const userRef: AngularFirestoreDocument<any> = this.angularFireStore.doc(`users/${user.uid}`)
    const data: any = {
      userId: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    }
    return userRef.set(data, { merge: true })
  }

  public signOut() {
    this.angularFireAuth.auth.signOut().then( () => {
        this.router.navigate(['/'])
    })
  }

  /////////////
  // Getters //
  /////////////
  public getUser(): User {
    return this.user
  }

  /////////////
  // Setters //
  /////////////
  public setUser(user: User): void {
    this.user = user
  }

}
