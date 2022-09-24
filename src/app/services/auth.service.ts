import { Injectable } from '@angular/core';
import { AlertType } from '../enums/alert-type';
import { Router } from '@angular/router';
import { Observable, of, switchMap, from as fromPromise } from 'rxjs';
import { User } from '../classes/user';
import { AlertService } from './alert.service';
import { Alert } from '../classes/alert';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore'


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser: Observable<User | null | undefined>;
  public currentUserSnapshot: User | null | undefined;
  constructor(
    private router: Router, 
    private alert: AlertService, 
    private afAuth: AngularFireAuth, 
    private db: AngularFirestore) {

    this.currentUser = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      }));

      this.setCurrentUserSnapshot();
    // this.currentUser= of(null);
  }

  private setCurrentUserSnapshot():void {
    this.currentUser.subscribe(user=> this.currentUserSnapshot = user);
  }
  public signUp(firstName: string, lastName: string, email: string, password: string): Observable<boolean> {

    return fromPromise(this.afAuth.createUserWithEmailAndPassword(email, password).then(user => {
      const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.user?.uid}`);
      const updatedUser = {
        id: user.user?.uid,
        email: user.user?.email,
        firstName,
        lastName,
        photoUrl: 'https://firebasestorage.googleapis.com/v0/b/chat-70193.appspot.com/o/default-profile-pic.jpg?alt=media&token=3db8703e-fbfc-4b24-aa91-4ad0c30734c9',
        quote:'No quote',
        bio:'Bio is under construction...'
      }
      userRef.set(updatedUser);
      return true;
    }).catch(err => false)
    );
  }
  public login(email: string, password: string): Observable<boolean> {
    return fromPromise(this.afAuth.signInWithEmailAndPassword(email, password).then(user => true).catch(err => false ))
    
  }

  public logout(): void {
    this.afAuth.signOut().then(()=>{
      this.router.navigate(['/login']);
      this.alert.alerts.next(new Alert('You have been signed out',AlertType.Success));
    })
    
  }
}
