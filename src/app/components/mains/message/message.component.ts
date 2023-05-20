import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact/contact.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  message!: string;
  constructor(private contactService: ContactService) {

  }

  ngOnInit(): void {
    this.message = this.contactService.getMessage();
  }
}
