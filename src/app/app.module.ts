import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { AddressSearchComponent } from './components/address-search/address-search.component';
import { MenuPanelComponent } from './components/menu-panel/menu-panel.component';
import { AddNewAddressComponent } from './components/add-new-address/add-new-address.component';
import { ContactComponent } from './components/contact/contact.component';
import { ContactsHolderComponent } from './components/contacts-holder/contacts-holder.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AddUserComponent } from './components/add-user/add-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    AddressSearchComponent,
    MenuPanelComponent,
    AddNewAddressComponent,
    ContactComponent,
    ContactsHolderComponent,
    ContactDetailsComponent,
    LandingPageComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }