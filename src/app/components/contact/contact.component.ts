import { Component, OnInit, Input } from '@angular/core';
import { Contact } from 'src/app/models/Contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @Input() contactInfo:Contact;

  constructor() { }

  ngOnInit() {
  }
}
