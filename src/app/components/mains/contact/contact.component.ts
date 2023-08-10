import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ContactService } from 'src/app/services/contact/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  locationUrl: string = 'https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d369.477517368689!2d105.78194983977606!3d21.02870440475317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sfpt%20aptech!5e0!3m2!1svi!2s!4v1683538531695!5m2!1svi!2s';
  safeUrl!: SafeResourceUrl;
  contactForm!: FormGroup;
  submitted: boolean = false;

  constructor(private domSanitizer: DomSanitizer, private formBuilder: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern('^([A-Za-z][a-z]+[ ]*)+$')]],
      lastname: ['', [Validators.required, Validators.pattern('^([A-Za-z][a-z]+[ ]*)+$')]],
      title: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(20)]],
      detail: ['', [Validators.required, Validators.minLength(20)]],
      acceptTerm: [false, [Validators.requiredTrue]]
    });
  }

  ngOnInit(): void {
    this.safeUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.locationUrl);

  }

  // submit contact form
  onSubmit() {
    this.submitted = true;
    this.contactService.submitForm(this.contactForm);
  }
}
