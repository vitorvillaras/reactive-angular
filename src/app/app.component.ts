import {Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from './loading/loading.service';
import { MessagesService } from './services/messages.service';
import { AuthStore } from './services/auth.store';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoadingService, MessagesService]
})
export class AppComponent implements  OnInit {


    constructor(public auth: AuthStore) {
    }


    ngOnInit() {

    }

  logout() {
    this.auth.logout();
  }

}
