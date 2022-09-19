import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap, map } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore'
import { LoadingService } from './loading.service';
import { AuthService } from './auth.service';
import { Timestamp } from "@firebase/firestore";
@Injectable({
  providedIn: 'root'
})
export class ChatroomService {

  public chatRooms!: Observable<any>;
  constructor(private db: AngularFirestore,
    private loadingService: LoadingService,
    private authService: AuthService) {
    this.chatRooms = db.collection('ChatRooms').valueChanges();
    this.selectedChatroom = this.changeChatroom.pipe(switchMap((chatroomId) => {
      if (chatroomId) {
        return db.doc(`ChatRooms/${chatroomId}`).valueChanges();
      }
      return of(null);
    }));

    this.selectedChatroomMessages = this.changeChatroom.pipe(switchMap((chatroomId) => {
      if (chatroomId) {
        return db.collection(`ChatRooms/${chatroomId}/messages`, ref => { return ref.orderBy('createdAt', 'desc').limit(100) }).
          valueChanges()
          .pipe(map(arr => arr.reverse() ));
      }
      return of(null);
    }))
  }

  public changeChatroom = new BehaviorSubject<string | null>(null);
  public selectedChatroom!: Observable<any>;
  public selectedChatroomMessages!: Observable<any>;

  public createMessage(text: string): void {
    const chatroomId = this.changeChatroom.value;
    const message = {
      message: text,
      createdAt: new Date(),
      sender: this.authService.currentUserSnapshot
    };
    this.db.collection(`ChatRooms/${chatroomId}/messages`).add(message);
  }

}
