import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AngularFirestore} from '@angular/fire/compat/firestore'
@Injectable({
  providedIn: 'root'
})
export class ChatroomService {

  public ChatRooms!: Observable<any>;
  constructor( private db:AngularFirestore) { 
    this.ChatRooms=db.collection('ChatRooms').valueChanges();
  }
}
