export interface BranchOfficeListModel {
  ok: string;
  data: Data[];
}

export interface Data {
  id: number;
  status: boolean;
  status_description: string;
  create_at: string;
  update_at: null | string;
  name: string;
  country: string;
  state_province: string;
  city: string;
  address: string;
  postal_code: string;
  cellphone_number: string;
  phone_number: string;
  email: string;
  img: null;
}
