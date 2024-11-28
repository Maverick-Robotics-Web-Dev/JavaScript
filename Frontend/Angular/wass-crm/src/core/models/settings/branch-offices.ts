export interface BranchOfficeModel {
  id: number;
  status?: boolean;
  status_description?: string;
  create_at?: string;
  update_at?: null | string;
  name: string;
  country: string;
  state_province: string;
  city: string;
  address: string;
  postal_code?: string;
  cellphone_number: string;
  phone_number?: string;
  email?: string;
  img?: null;
}

export interface BranchOfficeListModel {
  ok: string;
  msg?: string;
  data: BranchOfficeModel[];
}

export interface BranchOfficeRetrieveModel {
  ok?: string;
  error?: string;
  msg?: string;
  data?: BranchOfficeModel;
}

export interface BranchOfficeCrtUptModel {
  ok?: string;
  error?: string;
  data?: BranchOfficeModel;
  msg: string;
}

export interface BranchOfficeDeleteModel {
  ok?: string;
  error?: string;
  msg: string;
}
