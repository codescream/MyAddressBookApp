import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Contact } from 'src/app/models/Contact';
import { AddressService } from 'src/app/services/address.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-address-search',
  templateUrl: './address-search.component.html',
  styleUrls: ['./address-search.component.css']
})
export class AddressSearchComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.terms = "";
    this.searchTerms.complete();
  }
  showList:boolean = false;
  @Input() closeSearch:boolean;
  terms: string;
  addresses$: Contact[];
  private searchTerms = new Subject<string>();

  constructor(private addressService:AddressService, private userService:UserService) { }

  ngOnInit() {
    this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      
      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.addressService.searchAddresses(term))).subscribe(address => {
      this.addresses$ = address.filter(contact => contact.name.toLowerCase()
      .includes(this.terms.toLowerCase()) && contact.username == localStorage.getItem("username"));
    });
  }

  searchTerm(term:string)
  {
    this.terms = term;
    this.searchTerms.next(this.terms);
  }

  onFocus()
  {
    // this.showList = true;
    this.closeSearch = true;
  }
}