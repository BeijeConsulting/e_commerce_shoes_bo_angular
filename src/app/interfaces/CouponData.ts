export interface DataCoupon {
  id: string;
  code: string;
  maxUsage: string;
  userId?: string;
  expirationDate: string;
  type: string;
  value: string;
  minOrder: string;
  italianDescription: string;
  englishDescription: string;
}
