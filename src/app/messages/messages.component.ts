import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import { MessagesService } from '../services';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesComponent implements OnInit{
  showMessages = false;
  errors$: Observable<string[]>;

  constructor(private messageService: MessagesService) {
  }


  ngOnInit() {
    this.errors$ = this.messageService.messages$.pipe(
      tap(messages => {
        this.showMessages = true;
      })
    );
  }


  onClose() {
    this.showMessages = false;

  }

}
