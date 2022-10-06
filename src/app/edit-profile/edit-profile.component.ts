import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore,AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';
import { User } from '../interfaces/user';
import { AlertService } from '../services/alert.service';
import { Alert } from '../classes/alert';
import { AlertType } from '../enums/alert-type';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {

  public currentUser: any = null;
  public userId: string | null= '';
  public subscriptions: Subscription[] = [];
  public uploadPercent: number | undefined = 0;
  public downloadUrl: string | null = null;
  constructor(
    private auth: AuthService,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private fs: AngularFireStorage,
    private db: AngularFirestore,
    private location: Location,
    private alertService:AlertService
  ) {
    this.loadingService.isloading.next(true);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
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
        this.userId = params.get('userId');
      })
    )
  }

  public uploadFile(event:any):void{

    console.log("upload entered");
    const file = event.target.files[0];
    const filePath= "/files"+Math.random()+file;
    console.log(filePath)
    const task = this.fs.upload(filePath, file);
    
    const ref= this.fs.ref(filePath);
    
    //observe percentage changes
    this.subscriptions.push(
      task.percentageChanges().subscribe((percentage:any) => {
        if(percentage < 100){
          this.loadingService.isloading.next(true);
          console.log(percentage,"percentage");
        }else{
          this.loadingService.isloading.next(false);
        }
        this.uploadPercent=percentage;
      })
    );


    //get notified when download url is available
    this.subscriptions.push(
      ref.getDownloadURL().subscribe(url => {this.downloadUrl = url})
    );
  }

  public save():void{
    let photo;

    if(this.downloadUrl){
      photo = this.downloadUrl;
    }else{
      photo = this.currentUser.photoUrl;
    }

    const user = Object.assign({}, this.currentUser, {photoUrl:photo});
    const userRef : AngularFirestoreDocument<User>= this.db.doc(`users/${user.id}`);
    userRef.set(user);
    this.alertService.alerts.next(new Alert('Your profile was successfully updated',AlertType.Success));
    this.location.back();
  }

}
