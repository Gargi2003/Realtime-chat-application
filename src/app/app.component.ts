import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alert } from './classes/alert';
import { AlertService } from './services/alert.service';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private service: AlertService, private loadingService: LoadingService) { }

  public alerts: Array<Alert> = [];
  public loading: boolean = false;
  private subscription: Subscription[] = [];

  ngOnInit() {
    this.subscription.push(this.service.alerts.subscribe(response => {
      this.alerts.push(response);
    }));
    this.subscription.push(this.loadingService.isloading.subscribe(response => {
      this.loading = response;
    }));
  }
  ngOnDestroy() {
    this.subscription.forEach(sub=>sub.unsubscribe());
  }
}
