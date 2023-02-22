import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { filter } from "rxjs/operators";

@Injectable()
export class MessagesService {

    constructor() {
        console.log("MessagesService constructor")
    }

    private messagesSubject$: BehaviorSubject<string[]> = new BehaviorSubject([]);

    messages$: Observable<string[]> = this.messagesSubject$.asObservable().pipe(
        filter(messages => messages && messages.length > 0)
    );

    showMessages(...messages: string[]) {
        this.messagesSubject$.next(messages);
    }
}