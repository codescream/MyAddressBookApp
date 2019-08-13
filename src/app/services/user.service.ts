import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private usersUrl:string = 'https://localhost:44391/api/users';  // URL to web api
  username:string;
  signedIn:boolean = false; // = (this.username)? true:false;

  users: User[];

  constructor(private http:HttpClient) { }

  getUsers(): Observable<User[]>
  {
    return this.http.get<User[]>(this.usersUrl);
    // return of(this.addresses);
  }

  addUser(user:User): Observable<User>
  {
    this.getUsers().subscribe(users => this.users = users);
    return this.http.post<User>(this.usersUrl, user, httpOptions);
  }
}
