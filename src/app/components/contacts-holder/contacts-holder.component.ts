import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/Contact';
import { CONTACTS } from '../../models/mock-contacts'
import { AddressService } from 'src/app/services/address.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contacts-holder',
  templateUrl: './contacts-holder.component.html',
  styleUrls: ['./contacts-holder.component.css']
})
export class ContactsHolderComponent implements OnInit {
  
  username:string = this.userService.username? this.userService.username:""; // mark_ogilo@yahoo.com
  contacts:Contact[]; // = this.mockContacts;
  signedIn:string;

  constructor(private address:AddressService, private userService:UserService, private route:ActivatedRoute) {
    route.params.subscribe(val => {
      this.signedIn = localStorage.getItem("loggedIn");
      this.address.getAddresses().subscribe(addresses => {
      let test:string = localStorage.getItem("username");
      this.contacts = addresses.filter(user => user.username == localStorage.getItem("username"));
      })
    });
   }

  ngOnInit() {
    // alert(this.signedIn);
    // this.signedIn = localStorage.getItem("loggedIn");
    // this.address.getAddresses().subscribe(addresses => {
    //   let test:string = localStorage.getItem("username");
    //   this.contacts = addresses.filter(user => user.username == localStorage.getItem("username"));
    // })
  }
}