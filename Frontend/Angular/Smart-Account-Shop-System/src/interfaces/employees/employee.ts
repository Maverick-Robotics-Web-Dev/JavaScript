export interface EmployeeModel {
  ok: string;
  data: EmployeeData;
}

export interface EmployeeData {
  id: number;
  fk_user_employee: string;
  status: boolean;
  status_description: string;
  create_at: string;
  update_at: null | string;
  document_type: string;
  document_number: string;
  lastname: string;
  name: string;
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
  date_of_birth: string;
  contract_type: string;
  contract_code: string;
  admission_date: string;
  departure_date: null | string;
  departament: string;
  position: string;
  extension_number: string;
}
