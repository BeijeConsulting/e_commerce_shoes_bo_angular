export interface Order {
  id: number;
  transaction: string;
  transaction_date: string;
  payment_status: string;
  status: string;
  total_price: number;
  created_at: string;
  user_id: number;
  address: string;
}
