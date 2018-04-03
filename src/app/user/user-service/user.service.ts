import { Injectable, AnimationKeyframe } from '@angular/core'
import { Router } from '@angular/router'
import * as firebase from 'firebase/app'
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore'
import { Observable } from 'rxjs/Observable'
import { User } from '../user-model/user'
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserService {
  
  ///////////////
  // Variables //
  ///////////////
  public user: User = new User('1','','','')
  private authState: Observable<firebase.User>;

  //////////////
  // Subjects //
  //////////////
  public userSubject: Subject<User> = new Subject<User>()

  //////////////////
  // Constructors //
  //////////////////
  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFireStore: AngularFirestore,
    private router: Router
  ) {

    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        return this.angularFireStore.doc<User>(`users/${user.uid}`).valueChanges().subscribe( cUser => {
          this.user = new User(cUser.userId, cUser.email, cUser.photoURL, cUser.displayName)
          this.userSubject.next(this.user)
        })
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
    const userRef: AngularFirestoreDocument<any> = this.angularFireStore.doc(`users/${user.uid}`)
    const data: any = {
      userId: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    }
    this.setUser(new User(user.uid, user.email, user.displayName, user.photoURL))
    return userRef.set(data, { merge: true })
  }

  public signOut() {
    this.user = new User('','','','')
    this.angularFireAuth.auth.signOut().then( () => {
        this.router.navigate(['/'])
    })
  }

  /////////////
  // Getters //
  /////////////
  public getUser(): User {
    if (this.user.getUserId() != '1') {
      return this.user
    } else {
      this.angularFireAuth.authState.subscribe(user => {
        if (user) {
          return this.angularFireStore.doc<User>(`users/${user.uid}`).valueChanges().subscribe( cUser => {
            this.user = new User(cUser.userId, cUser.email, cUser.photoURL, cUser.displayName)
            this.userSubject.next(this.user)
          })
        } else {
          return Observable.of(null)
        }
      })
    }
    return this.user
  }

  /////////////
  // Setters //
  /////////////
  public setUser(user: User): void {
    this.user = user
    this.userSubject.next(user)
  }

}
