export interface BranchOfficeModel {
  id: number;
  name: string;
  country: string;
  state_province: string;
  city: string;
  address: string;
  cellphone_number: string;
  status_description?: string;
  status?: boolean;
  create_at?: string;
  update_at?: null | string;
  postal_code?: string;
  phone_number?: string;
  email?: string;
  img?: File | string | null;
}

export interface BranchOfficeList {
  ok?: string;
  data?: BranchOfficeModel[];
  next?: string | null;
  previous?: string | null;
  count?: number | null;
  pages?: number | null;
  current?: number | null;
  msg?: string;
}

export interface BranchOffice {
  ok?: string;
  error?: string;
  data?: BranchOfficeModel;
  msg?: string;
}
