import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPersonalAddressComponent } from './edit-personal-address.component';

describe('EditPersonalAddressComponent', () => {
  let component: EditPersonalAddressComponent;
  let fixture: ComponentFixture<EditPersonalAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPersonalAddressComponent]
    });
    fixture = TestBed.createComponent(EditPersonalAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
