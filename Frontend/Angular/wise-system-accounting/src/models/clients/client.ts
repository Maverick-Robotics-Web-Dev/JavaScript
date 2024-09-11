export interface ClientModel {
  ok: string;
  data: ClientData;
}

export interface ClientData {
  id: number;
  fk_user_employee: string;
  status: boolean;
  status_description: string;
  create_at: string;
  update_at: null | string;
  document_type: string;
  document_number: string;
  lastname: string;
  country: string;
  state_province: string;
  city: string;
  address: string;
  postal_code: string;
  phone_number: string;
  cellphone_number: string;
  email: string;
  img: null | string;
  code: string;
  name: string;
  trade_name: null | string;
  branch_office_address_one: string;
  branch_office_address_two: string;
  branch_office_address_three: string;
  branch_office_address_four: string;
  phone_number_one: string;
  phone_number_two: string;
  phone_number_three: string;
  phone_number_four: string;
}
