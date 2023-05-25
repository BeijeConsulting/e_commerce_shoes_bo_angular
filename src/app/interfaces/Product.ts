export interface Product {
  name: string;
  descriptionIt: string;
  descriptionEng: string;
  color: string;
  size: string;
  brand: string;
  listedPrice: string;
  type: string;
  category: string;
  id: string;
  quantity: string;
  isListed: number;
  imagePreview: string;
  startingPrice: number;
}

export interface ProductPreview {
  id: number;
  name: string;
  category: string;
  brand: string;
  starting_price: number;
  image_preview: string;
}

export interface ProductFull {
  id: number;
  createdAt: {
    year: number;
    month: string;
    monthValue: number;
    dayOfMonth: number;
    hour: number;
    minute: number;
    second: number;
    nano: number;
    dayOfWeek: string;
    dayOfYear: number;
    chronology: {
      calendarType: string;
      id: string;
    };
  };
  disabledAt: null | any;
  name: string;
  descriptionIt: string;
  descriptionEng: string;
  isListed: number;
  listedPrice: number;
  color: string;
  category: string;
  type: string;
  brand: string;
  imagePreview: string;
  startingPrice: number;
}

export interface ProductDetailsFull {
  id: number;
  createdAt: {
    year: number;
    month: string;
    monthValue: number;
    dayOfMonth: number;
    hour: number;
    minute: number;
    second: number;
    nano: number;
    dayOfWeek: string;
    dayOfYear: number;
    chronology: {
      calendarType: string;
      id: string;
    };
  };
  disabledAt: {
    year: number;
    month: string;
    monthValue: number;
    dayOfMonth: number;
    hour: number;
    minute: number;
    second: number;
    nano: number;
    dayOfWeek: string;
    dayOfYear: number;
    chronology: {
      calendarType: string;
      id: string;
    };
  };
  isListed: boolean;
  sellingPrice: number;
  quantity: number;
  size: string;
  productId: number;
  product: null | any;
}

export interface ProductImage {
  altEng: string;
  altIt: string;
  imageNumber: number;
  type: string;
  imagePath: string;
}

export interface ProductImageFull {
  id: number;
  createdAt: {
    year: number;
    month: string;
    monthValue: number;
    dayOfMonth: number;
    hour: number;
    minute: number;
    second: number;
    nano: number;
    dayOfWeek: string;
    dayOfYear: number;
    chronology: {
      calendarType: string;
      id: string;
    };
  };
  disabledAt: null | any;
  imagePath: string;
  type: string;
  imageNumber: number;
  altIt: string;
  altEng: string;
  productId: number;
}

export interface ProductSize {
  is_listed: boolean;
  quantity: null | number;
  selling_price: null | number;
  size: null | string;
}

export interface ProductSizeWithId extends ProductSize {
  productId: number;
}
