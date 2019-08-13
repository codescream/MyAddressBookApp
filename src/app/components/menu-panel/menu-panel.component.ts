import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import {filter} from 'rxjs/operators';
import { AddressService } from 'src/app/services/address.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu-panel',
  templateUrl: './menu-panel.component.html',
  styleUrls: ['./menu-panel.component.css']
})
export class MenuPanelComponent implements OnInit {
  page:string;
  id:string;
  @Input() closeSearch:boolean;
  loggedIn:boolean;

  constructor(private addressService:AddressService, private router:Router, private location:Location, private userService:UserService, 
    private route:ActivatedRoute) { 
      route.params.subscribe(val => {

        this.page = this.router.url;

        router.events.pipe(
          filter((event: any) => event instanceof NavigationEnd)
            ).subscribe(event => {
              this.page = event["url"];
              let urlarray = this.page.split("/");
              // this.id = (event["url"]).replace(/\D/g, ""); // gets id from url route link
              this.id = urlarray[3]; // 3 represent the 4th array item is the url after split method
              if(localStorage.getItem("loggedIn") != null)
              {
                this.loggedIn = true;
              }
              else
              {
                this.loggedIn = false;
              }
          });

          if(localStorage.getItem("loggedIn") != null)
          {
            this.loggedIn = true;
          }
          else
          {
            this.loggedIn = false;
          }
      });
    }

  ngOnInit() {
    
  }

  removeContact()
  {  
    this.addressService.removeAddress(this.id).subscribe(() => {
      this.location.back();
    });
  }
}