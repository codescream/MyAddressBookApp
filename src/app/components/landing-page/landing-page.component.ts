import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  //animations: [
    // trigger('openClose', [
    //   // ...
    //   state('open', style({
    //     display: 'block',
    //     // top: '0px'
    //   })),
    //   state('closed', style({
    //     top: '-400px',
    //     display: 'none'
    //   })),
    //   transition('open <=> closed', [
    //     animate('1s ease-in')
    //   ]),
    // ]),
})
export class LandingPageComponent implements OnInit {

  showSignup:boolean = false;
  showAbout:boolean = false;
  signedIn:string = localStorage.getItem("loggedIn"); 

  constructor(private userService:UserService, private router:Router, private route:ActivatedRoute) {
    // alert(this.signedIn);
    route.params.subscribe(val => {
      if(localStorage.getItem("loggedIn") != null)
      {
        this.router.navigate(['/contacts']);
      }
      // alert(this.signedIn);
    });
   }

  ngOnInit() {
    this.signedIn = localStorage.getItem("loggedIn");
    // alert(this.signedIn);
  }

  toggleSignup()
  {
    this.showSignup = !this.showSignup;
    this.showAbout = (this.showAbout)? !this.showAbout:this.showAbout;
  }
  toggleAbout()
  {
    this.showAbout = !this.showAbout;
    this.showSignup = (this.showSignup)? !this.showSignup:this.showSignup;
  }
}