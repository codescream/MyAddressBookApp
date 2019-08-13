import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import { global } from '../../models/global'
import { logging } from 'protractor';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  
  username:string;
  password:string;
  status:string = "A";
  userexist:boolean = false;

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit() {
  }

  onSubmit()
  {
    let userexist:User;
    const newuser = {
      username: this.username,
      password: this.password,
      status: this.status 
    }

    this.userService.getUsers().subscribe(users => {
      userexist = users.find(user => user.username == this.username);
      
      if(userexist)
      {
        this.userexist = true;
        this.userService.signedIn = false;
        return;
      }
      else
      {
        this.userService.addUser(newuser as User).subscribe(user => {
          this.userService.users.push(user);

        this.userService.username = user.username;
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("username", user.username);
        global.isloggedIn = localStorage.getItem("loggedIn");
        this.router.navigate(['/contacts']);
        });
      }
    })
  }
}