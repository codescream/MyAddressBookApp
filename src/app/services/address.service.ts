import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from '../models/Contact';
import { CONTACTS } from '../models/mock-contacts';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private addressesUrl:string = 'https://localhost:44391/api/contacts';  // URL to web api

  addresses: Contact[] = CONTACTS;

  constructor(private http:HttpClient) { }

  getAddresses(): Observable<Contact[]>
  {
    return this.http.get<Contact[]>(this.addressesUrl);
    // return of(this.addresses);
  }

  getAddress(id:string): Observable<Contact>
  {
    const addressesUrl = `${this.addressesUrl}/${id}`
    return this.http.get<Contact>(addressesUrl);
  }

  addAddress(address:Contact): Observable<Contact>
  {
    this.getAddresses().subscribe(addresses => this.addresses = addresses);
    return this.http.post<Contact>(this.addressesUrl, address, httpOptions);
  }

  updateAddress(id:string, address:Contact): Observable<any>
  {
    const addressesUrl = `${this.addressesUrl}/${id}`;
    return this.http.put<Contact>(addressesUrl, address, httpOptions);
  }

  removeAddress(id:string):Observable<Contact>
  {
    const addressesUrl = `${this.addressesUrl}/${id}`;
    this.getAddresses().subscribe(addresses => this.addresses = addresses);
    this.addresses = this.addresses.filter(address => address.id != id);
    return this.http.delete<Contact>(addressesUrl, httpOptions);
  }

  searchAddresses(term:string):Observable<Contact[]>
  {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Contact[]>(`${this.addressesUrl}`);
  }
}