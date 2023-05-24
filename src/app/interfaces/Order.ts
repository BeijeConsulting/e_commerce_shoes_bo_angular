export interface OrderProduct {
  brand: string;
  category: string;
  id: number;
  image_preview?: string;
  name: string;
  quantity: string;
  starting_price?: number;
}

export interface orderItem {
  address: string;
  created_at: string;
  id: number;
  payment_status: string;
  status: string;
  total_price: number;
  transaction: string;
  transaction_date: string;
  user_id: number;
}
