import { Component } from '@angular/core';
import { Alert } from './classes/alert';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private service:AlertService){}

  public alerts:Array<Alert>=[];

  ngOnInit(){
    this.service.alerts.subscribe(response=>{
      this.alerts.push(response);
    })
  }
}
