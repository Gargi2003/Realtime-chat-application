import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TitleStrategy } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm!: FormGroup;

  constructor(private fb:FormBuilder) {
    this.createForm();
   }

  ngOnInit(): void {
  }
  private createForm():void {
    this.signupForm=this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(8)]],
      firstName:['',[Validators.required]],
      lastName:['',[Validators.required]],
    });
  }

  public submit():void{
    const {email,password,firstName,lastName}= this.signupForm.value;
    console.log(`email: ${email} password: ${password} firstname: ${firstName} lastname: ${lastName}`)
  }

}
