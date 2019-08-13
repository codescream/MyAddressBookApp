import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewAddressComponent } from './components/add-new-address/add-new-address.component';
import { ContactsHolderComponent } from './components/contacts-holder/contacts-holder.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';


const routes: Routes = [
  { path: "", component: LandingPageComponent },
  { path: "contacts", component: ContactsHolderComponent },
  // { path: "contacts", component: ContactsHolderComponent },
  { path: "newContact", component: AddNewAddressComponent },
  { path: "contacts/contactDetails/:id", component: ContactDetailsComponent},
  { path: "contacts/contactDetails/:id/:edit", component: ContactDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
