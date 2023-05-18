import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCouponComponent } from './card-coupon.component';

describe('CardCouponComponent', () => {
  let component: CardCouponComponent;
  let fixture: ComponentFixture<CardCouponComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardCouponComponent]
    });
    fixture = TestBed.createComponent(CardCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
