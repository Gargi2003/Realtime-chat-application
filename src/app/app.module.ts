import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import {AlertModule } from 'ngx-bootstrap/alert';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ChatComponent } from './components/chat/chat.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ChatInputComponent } from './components/chat-input/chat-input.component';
import { ChatroomListComponent } from './components/chatroom-list/chatroom-list.component';
import {ChatMessageComponent} from './components/chat-message/chat-message.component';
import{ChatroomTitleBarComponent} from './components/chatroom-title-bar/chatroom-title-bar.component';
import{ChatroomWindowComponent} from './components/chatroom-window/chatroom-window.component'
import { FormsModule } from '@angular/forms';
import { AlertService } from './services/alert.service';
import { NgxLoadingModule } from "ngx-loading";
import { AuthGuard } from './guards/auth.guard';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ChatComponent,
    NavbarComponent,
    ChatroomWindowComponent,
    ChatroomTitleBarComponent,
    ChatMessageComponent,
    ChatroomListComponent,
    ChatInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TooltipModule.forRoot(),
    AlertModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    NgxLoadingModule
  ],
  providers: [AlertService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
