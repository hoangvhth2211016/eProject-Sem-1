import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  message!: string;
  constructor(private router: Router) { }

  // get message
  getMessage(): string {
    return this.message;
  }

  // set message
  setMessage(message: string) {
    this.message = message;
  }

  // submit form
  submitForm(form: FormGroup) {
    if (form.invalid) {
      console.log("error");
      return;
    }
    this.setMessage("Your message has been submitted successfully");
    this.router.navigateByUrl('/message');
  }
}
