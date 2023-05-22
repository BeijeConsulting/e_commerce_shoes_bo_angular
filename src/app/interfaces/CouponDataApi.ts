export interface CouponDataApi {
  code: string;
  description_eng: string;
  description_it: string;
  expire_date: string;
  id: number;
  max_usages: number;
  min_order: number;
  status: string;
  type: string;
  user_id: number | null;
  value: number;
}

export interface CouponDataResponseApi {
  total_element: number;
  coupons: CouponDataApi[];
}
