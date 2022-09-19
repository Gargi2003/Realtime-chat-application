import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';
import { ChatroomService } from './services/chatroom.service';

const routes: Routes = [
  {path: '',pathMatch: 'full' , redirectTo: '/login'},
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path:'chat', canActivate:[AuthGuard],
    children: [
      {path: '',component: ChatComponent},
      {path: ':chatroomId',component: ChatComponent}
    ]
  },
  {path:'**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
