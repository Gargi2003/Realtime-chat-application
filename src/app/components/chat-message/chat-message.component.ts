import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/classes/message';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {

  constructor(private auth: AuthService,) { }

  ngOnInit(): void {
    this.auth.currentUser.subscribe(user=>{
      this.currentUser=user;
    })
  }

  @Input()
  message!: Message; 
  
  public currentUser: any = null;


}
