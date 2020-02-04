import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from './app.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  isLoading: boolean = false;
  method: string = "get";
  response: Object = null;
  appServiceSubscription: Subscription;
  constructor(private appService: AppService) {}

  ngOnInit() {
  }

  ngOnDestroy() {
    this.appServiceSubscription.unsubscribe();
  }

  tabChanged(event): void {
    switch(event.index){
      case 0:
        this.method = "get";
        break;
      case 1:
        this.method = "post";
        break;
      case 2:
        this.method = "put";
        break;
      case 3:
        this.method = "delete";
        break;
    }
    this.response = null;
  }

  onSend(form: NgForm, type: HTMLSelectElement, school: HTMLSelectElement, id: HTMLInputElement, body: HTMLTextAreaElement): void {
    this.response = null;
    this.isLoading = true;
    this.appServiceSubscription = this.appService.subject.subscribe(response=>{
      this.isLoading = false;
      this.response = response;
      this.appServiceSubscription.unsubscribe();
    });

    switch(this.method){
      case "get":
        this.appService.get(school.value, type.value, +id.value);
        break;
      case "post":
        this.appService.post(school.value, type.value, body.value);
        break;
      case "put":
        this.appService.put(school.value, type.value, +id.value, body.value);
        break;
      case "delete":
        this.appService.delete(school.value, type.value, +id.value);
        break;
    }
  }
}
