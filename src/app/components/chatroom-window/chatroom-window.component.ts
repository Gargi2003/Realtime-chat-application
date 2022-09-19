import { Component, OnDestroy, OnInit,AfterViewChecked,ElementRef,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ChatroomService } from 'src/app/services/chatroom.service';
import { LoadingService } from 'src/app/services/loading.service';
// import{} from '../../../assets/images'
@Component({
  selector: 'app-chatroom-window',
  templateUrl: './chatroom-window.component.html',
  styleUrls: ['./chatroom-window.component.scss']
})
export class ChatroomWindowComponent implements OnInit,OnDestroy,AfterViewChecked {

  private subscription:Subscription[]=[];
  public chatroom: any;
  public messages: any;

  @ViewChild('scrollContainer')
  private scrollContainer!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private chatroomService: ChatroomService,
    private loadingService:LoadingService) 
    {
      this.subscription.push(
        this.chatroomService.selectedChatroom.subscribe(chatroom =>{
          this.chatroom=chatroom;
          // this.loadingService.isloading.next(false);
        })
      );

      this.subscription.push(
        this.chatroomService.selectedChatroomMessages.subscribe(messages =>{
          this.messages=messages;
          // this.loadingService.isloading.next(false);
        })
      );
     }
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }
  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.scrollToBottom();
    this.subscription.push(
      this.route.paramMap.subscribe(params =>{
        const chatroomId = params.get('chatroomId');
        this.chatroomService.changeChatroom.next(chatroomId);
      })
    )
  }

  private scrollToBottom():void{
    try{
      this.scrollContainer.nativeElement.scrollTop=this.scrollContainer.nativeElement.scrollHeight;
    }catch(err){

    }
  }

}
