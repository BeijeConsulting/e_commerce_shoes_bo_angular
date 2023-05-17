import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPersonalAddressComponent } from './add-personal-address.component';

describe('AddPersonalAddressComponent', () => {
  let component: AddPersonalAddressComponent;
  let fixture: ComponentFixture<AddPersonalAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPersonalAddressComponent]
    });
    fixture = TestBed.createComponent(AddPersonalAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
