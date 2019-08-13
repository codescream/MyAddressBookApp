import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsHolderComponent } from './contacts-holder.component';

describe('ContactsHolderComponent', () => {
  let component: ContactsHolderComponent;
  let fixture: ComponentFixture<ContactsHolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsHolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
