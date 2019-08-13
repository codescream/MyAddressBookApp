import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  toggle:boolean = false;  
  title:string;
  loggedIn:boolean;
  @Output() showerror: EventEmitter<boolean> = new EventEmitter();

  constructor(private userSerive:UserService,  private route:ActivatedRoute, private router:Router) { 
    route.params.subscribe(val => {
      
      router.events.pipe(
        filter((event: any) => event instanceof NavigationEnd)
          ).subscribe(event => {
            if(localStorage.getItem("loggedIn") != null)
            {
              this.loggedIn = true;
            }
            else
            {
              this.loggedIn = false;
            }
        });
    });
  }

  ngOnInit() {
   
  }

  toggleLogin()
  {
    this.toggle = !this.toggle;
  }
  updateLogin(event:boolean)
  {
    this.toggle = event;
  }
  logout()
  {
    localStorage.clear();
    this.router.navigate(['/']);
  }
  displayError(event:boolean)
  {
    this.showerror.emit(event);
  }
}