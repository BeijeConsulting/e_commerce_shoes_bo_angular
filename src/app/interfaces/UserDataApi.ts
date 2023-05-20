interface UserAddressApi {
  id: number;
  label: string;
  country: string;
  instructions: string;
  name_surname: string;
  street_address: string;
  telephone: string;
  user_id: number;
  zipCode: string;
}

export interface UserDataApi {
  id: number;
  telephone: string;
  email: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  authories: string[];
  addresses: UserAddressApi[];
}

export interface UserDataResponseApi {
  total_element: number;
  usersDTO: UserDataApi[];
}
