export interface PersonalAddressData {
  label: string;
  fullName: string;
  address: string;
  zipCode: string;
  phoneNumber: string;
  country: string;
  instructions?: string;
}

export interface PersonalAddressDataApiPost {
  country: string;
  instructions: string;
  label: string;
  name_surname: string;
  street_address: string;
  telephone: string;
  zipcode: string;
}

export interface PersonalAddressDataApi {
  country: string;
  id: number;
  instructions: string;
  label: string;
  name_surname: string;
  street_address: string;
  telephone: string;
  usere_id: number;
  zipcode: string;
}
