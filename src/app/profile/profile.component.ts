import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit,OnDestroy {

  public currentUser:any;
  public user: User | undefined;
  public subscriptions:Subscription[]=[];
  constructor(
    private loadingService:LoadingService,
    private route:ActivatedRoute,
    private auth:AuthService,
    private db: AngularFirestore) { 
      this.loadingService.isloading.next(true);
    }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub=> sub.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.auth.currentUser.subscribe(user=>{
        this.currentUser=user;
        this.loadingService.isloading.next(false);
      })
    );

    this.subscriptions.push(
      this.route.paramMap.subscribe(params=>{
        const userId= params.get('userId');
        const userRef:AngularFirestoreDocument<User>=this.db.doc(`users/${userId}`);
        userRef.valueChanges().subscribe(user=> this.user = user)
      })
    );
  }

}
