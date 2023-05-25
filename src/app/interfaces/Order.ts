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

export interface orderDetail {
  products: [
    {
      brand: string;
      category: string;
      color: string;
      image_path?: string;
      selling_price: number;
      product_id: number;
    }
  ];
}

// export interface Order {}
