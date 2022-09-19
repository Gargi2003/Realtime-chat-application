import { Component, OnInit } from '@angular/core';
import { ChatroomService } from 'src/app/services/chatroom.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements OnInit {

  constructor(private chatroomService:ChatroomService) { }

  ngOnInit(): void {
  }

  public newMessageText:string='';

  public submit(message:string):void {
    this.chatroomService.createMessage(message);
    this.newMessageText=''
  }
}
