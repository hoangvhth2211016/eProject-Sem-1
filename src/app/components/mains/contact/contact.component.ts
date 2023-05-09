import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  locationUrl: string = 'https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d369.477517368689!2d105.78194983977606!3d21.02870440475317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sfpt%20aptech!5e0!3m2!1svi!2s!4v1683538531695!5m2!1svi!2s';
  safeUrl!: SafeResourceUrl;

  constructor(public domSanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.safeUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.locationUrl);
  }
}
