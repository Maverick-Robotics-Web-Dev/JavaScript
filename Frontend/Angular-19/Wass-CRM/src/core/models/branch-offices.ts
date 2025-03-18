export interface BranchOffice {
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
  img?: File | null;
}

export interface BranchOfficeRetrieveModel {
  ok?: string;
  error?: string;
  msg?: string;
  data?: BranchOffice;
}

export interface BranchOfficeCrtUptModel {
  ok?: string;
  error?: string;
  data?: BranchOffice;
  msg?: string;
}

export interface BranchOfficeDeleteModel {
  ok?: string;
  error?: string;
  msg?: string;
}

export interface BranchOfficeResponseList {
  ok: string;
  data?: BranchOffice[];
  next?: string | null;
  previous?: string | null;
  count?: number | null;
  pages?: number | null;
  msg?: string;
}

export interface BranchOfficeResponse {
  ok: string;
  error?: string;
  data?: BranchOffice;
  msg?: string;
}
