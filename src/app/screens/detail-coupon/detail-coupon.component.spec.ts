import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCouponComponent } from './detail-coupon.component';

describe('DetailCouponComponent', () => {
  let component: DetailCouponComponent;
  let fixture: ComponentFixture<DetailCouponComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailCouponComponent]
    });
    fixture = TestBed.createComponent(DetailCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
