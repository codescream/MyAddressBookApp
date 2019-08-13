import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { AddressService } from 'src/app/services/address.service';
import { Contact } from 'src/app/models/Contact';

@Component({
  selector: 'app-add-new-address',
  templateUrl: './add-new-address.component.html',
  styleUrls: ['./add-new-address.component.css']
})
export class AddNewAddressComponent implements OnInit {

  public imagePath:any;
  name:string;
  phone:string;
  email:string;
  address:string;
  notes:string;
  imagesrc:string | ArrayBuffer = "";
  reader:FileReader;

  constructor(private addAddress:AddressService, private location: Location) { }

  ngOnInit() {
  }

  onSubmit()
  {
    const newaddress = {
      username: localStorage.getItem("username"),
      name: this.name,
      phone: this.phone,
      email: this.email,
      address: this.address,
      image: (this.imagesrc)? this.imagesrc:null,
      notes: this.notes
    }
    this.addAddress.addAddress(newaddress as Contact).subscribe(addresses => {
      this.addAddress.addresses.push(addresses);
      this.goBack();
    });

    //reset fields
    this.name = "";
    this.phone = "";
    this.email = "";
    this.address = "";
    this.notes = "";
    this.imagesrc = "";
  }

  handleFile(file: File)
  {
    this.reader = new FileReader();
    this.imagePath = file[0];
    this.reader.readAsDataURL(file[0]); 
    this.reader.onload = (_event) => { 
      this.imagesrc = this.reader.result;
    }
  }

  goBack(): void {
    this.location.back();
  }
}