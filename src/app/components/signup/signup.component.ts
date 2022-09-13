import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, TitleStrategy } from '@angular/router';
import { Subscription } from 'rxjs';
import { Alert } from 'src/app/classes/alert';
import { AlertType } from 'src/app/enums/alert-type';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  public signupForm!: FormGroup;
  private subscription: Subscription[] = [];
  private returnUrl: string = '';
  constructor(private fb: FormBuilder,private alertService: AlertService, private router: Router, private auth: AuthService, private loadingService: LoadingService) {
    this.createForm();
  }
  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
  }
  private createForm(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    });
  }

  public submit(): void {
    if (this.signupForm.valid) {
      const { email, password, firstName, lastName } = this.signupForm.value;
      // console.log(`email: ${email} password: ${password} firstname: ${firstName} lastname: ${lastName}`);

      this.subscription.push(
        this.auth.signUp(firstName, lastName, email, password).subscribe(success => {
          if (success) {
            this.router.navigate(['/chat']);
          } else {
            const failedSignUpAlert = new Alert('There was a problem signing you up. Please try again.',AlertType.Danger)
            this.alertService.alerts.next(failedSignUpAlert);
          }
          this.loadingService.isloading.next(false);
        })
      )
    }else{
      const failedSignUpAlert = new Alert('There was a problem signing you up. Please try again.',AlertType.Danger);
      this.alertService.alerts.next(failedSignUpAlert);
    }
  }

}
