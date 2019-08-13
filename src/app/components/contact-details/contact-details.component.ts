import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AddressService } from 'src/app/services/address.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/Contact';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  @ViewChild('file', {static: false}) myImageFile:ElementRef;
  address:Contact;
  edit:boolean = false;
  reader: FileReader;
  imagePath: any;
  imagesrc: string | ArrayBuffer;

  id:string;
  name:string;
  phone:string;
  email:string;
  addy:string;
  notes:string;
  imageSrc:string | ArrayBuffer = "";

  constructor(private addressService:AddressService, private route:ActivatedRoute, private location:Location, private router:Router, 
    private userService:UserService) {
    route.params.subscribe(val => {
      let edit:boolean;
      this.route.paramMap.subscribe(params => {
        this.id = params.get('id');
        edit = params.get('edit')? true:false;
      });
      this.addressService.getAddress(this.id).subscribe(address =>{
        this.address = address;
        if(edit)
        {
          this.editContact();
        }
      });
    });
   }

  ngOnInit() {}

  editContact()
  {
    this.edit = true;
    this.name = this.address.name;
    this.phone = this.address.phone;
    this.email = this.address.email;
    this.addy = this.address.address;
    this.notes = this.address.notes;
  }

  cancelEdit()
  {
    this.edit =  false;
    this.imagesrc = "";
  }

  updateContact(event:any)
  {
    const newaddress = {
    id: this.id,
    username: localStorage.getItem("username")? localStorage.getItem("username"): "",
    name: event.target.name.value,
    phone: event.target.phone.value,
    email: event.target.email.value,
    address: event.target.address.value,
    notes: event.target.notes.value,
    image: (this.imagesrc)?this.imagesrc:(event.target.originalImg.value)?event.target.originalImg.value:null
    }
    
    this.addressService.updateAddress(this.id, newaddress).subscribe(()=>{
      this.addressService.getAddress(this.id).subscribe(address =>{
        this.address = address;});
      this.router.navigate([`contactDetails/${this.id}`]);
      this.edit = false;
    });
  }

  removePix()
  {
    this.imagesrc = "../../../assets/addpix.png";
    this.myImageFile.nativeElement.value = "";
  }

  handleFile(file:File)
  {
    this.reader = new FileReader();
    this.imagePath = file[0];
    this.reader.readAsDataURL(file[0]); 
    this.reader.onload = (_event) => { 
    this.imagesrc = this.reader.result;
    }
  }
}