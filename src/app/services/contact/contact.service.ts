import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessagesService } from '../messages/messages.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private router: Router, private messagesService: MessagesService) { }

  // submit form
  submitForm(form: FormGroup) {
    if (form.invalid) {
      console.log("error");
      return;
    }
    this.messagesService.setMessage("Congratulation!", "Your message has been submitted successfully.");
    this.router.navigateByUrl('/message');
  }
}
