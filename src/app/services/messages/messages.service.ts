import { Injectable } from '@angular/core';
import { Message } from 'src/app/models/Message/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  message!: Message;

  constructor() { }

  // get message
  getMessage(): Message {
    return this.message;
  }

  // set message
  setMessage(headline: string, detail: string) {
    this.message = new Message(headline, detail);
  }
}
