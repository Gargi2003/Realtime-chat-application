import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
import { Subscription } from 'rxjs';
import { Alert } from 'src/app/classes/alert';
import { AlertType } from 'src/app/enums/alert-type';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private alertService: AlertService, private loadingService: LoadingService, private auth: AuthService, private router: Router, private route: ActivatedRoute) {
    this.createForm();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  private subscriptions: Subscription[] = [];
  private returnUrl: string = '';

  ngOnInit() {
    return this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/chat';
  }
  private createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  public submit(): void {

    if (this.loginForm.valid) {
      this.loadingService.isloading.next(true);
      const { email, password } = this.loginForm.value;
      // console.log(`email: ${email} password: ${password}`)

      this.subscriptions.push(
        this.auth.login(email, password).subscribe(success => {
          if (success) {
            this.router.navigateByUrl(this.returnUrl);
          }
          this.loadingService.isloading.next(false);

        })
      );
    } else {
      const failedLogin = new Alert('Either username or password is invalid', AlertType.Danger);
      this.loadingService.isloading.next(false);
      this.alertService.alerts.next(failedLogin);

    }

  }

}
