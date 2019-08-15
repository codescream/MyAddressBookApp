import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations'
import { UserService } from 'src/app/services/user.service';
import { global } from '../../models/global'
import { User } from 'src/app/models/User';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',  
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        width: 'initial',
      })),
      state('closed', style({
        width: '0px',
        paddingLeft: '0px',
        paddingRight: '0px',
        fontSize: '0%'
      })),
      transition('open <=> closed', [
        animate('1s ease-in')
      ]),
    ]),
  ]
})
export class LoginComponent implements OnInit {

  username:string;
  password:string;

  @Output() toggleLogin: EventEmitter<boolean> = new EventEmitter();
  @Output() showerror: EventEmitter<boolean> = new EventEmitter();
  @Input() login:boolean;

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit() {
  }

  signIn(form: NgForm)
  {
    this.login = false;
    this.toggleLogin.emit(this.login);

    let userexist:User;

    this.userService.getUsers().subscribe(users => {
      userexist = users.find(user => user.username == this.username);
      if(userexist)
      {
        if(userexist.password == this.password)
        {
          this.userService.signedIn = true;

          this.userService.username = userexist.username;
          localStorage.setItem("loggedIn", "true");
          localStorage.setItem("username", userexist.username);
          global.isloggedIn = localStorage.getItem("loggedIn");
          this.router.navigate(['/contacts']);
        }
        else
        {
          localStorage.setItem("errormsg", "Incorrect username or password!!!");
          this.showerror.emit(true);
        
          form.reset();
          return;
        }
      }
      else
      {
        localStorage.setItem("errormsg", "username not found, sign up below!!!");
        this.showerror.emit(true);
        form.reset();
        return;
      }
      form.reset();
    })
  }
}