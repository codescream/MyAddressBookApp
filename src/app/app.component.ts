import { Component, Output, OnInit} from '@angular/core';
import { global } from './models/global';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('dropSignInError', [
      state('shown', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('shown => hidden', animate('1200ms')),
      transition('hidden => shown', animate('1200ms')),
    ])
  ]
})

export class AppComponent implements OnInit {
  title = 'address-book';
  closeSearch:boolean;
  signedIn:string;
  env = global;
  errormsg:string;
  showerror:boolean = false;

  constructor(private route:ActivatedRoute, private router:Router){ }

  ngOnInit() {
    this.env.isloggedIn = localStorage.getItem("loggedIn");;
    this.signedIn = localStorage.getItem("loggedIn");
    this.errormsg = localStorage.getItem("errormsg");
    if(localStorage.getItem("loggedIn") != null)
    {
      this.router.navigate(['/contacts']);
    }
    else
    {
      this.router.navigate(['/']);
    }
  }

  toggleSearch(event:MouseEvent)
  {
    if((event.target as Element).id == "search")
    {
      this.closeSearch = false;
    }
    else
    {
      this.closeSearch = true;
    }
  }
  displayError(event:boolean)
  {
    this.showerror = event;
    this.errormsg = localStorage.getItem("errormsg");
    setTimeout(()=>{
      this.showerror = false;
    }, 3000);
  }
}