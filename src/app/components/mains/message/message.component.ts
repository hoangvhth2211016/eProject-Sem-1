import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/Message/message.model';
import { MessagesService } from 'src/app/services/messages/messages.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  message!: Message;
  constructor(private messagesService: MessagesService) {

  }

  ngOnInit(): void {
    this.message = this.messagesService.getMessage();
  }
}
