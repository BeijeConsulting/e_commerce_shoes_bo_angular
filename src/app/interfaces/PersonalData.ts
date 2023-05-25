export interface PersonalAddress {
  country: string;
  id: number;
  instructions: string;
  label: string;
  name_surname: string;
  street_address: string;
  telephone: string;
  user_id: number;
  zipcode: string;
}

export interface PersonalDataEdit {
  birth_date: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string | null;
  telephone: string;
}

export interface PersonalDataEditForm {
  birthDate: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
}

export interface PersonalData {
  addresses: PersonalAddress[];
  birth_date: string;
  cart_items: number;
  email: string;
  first_name: string;
  last_name: string;
  password: string | null;
  telephone: string;
  wish_list_item: number;
}
