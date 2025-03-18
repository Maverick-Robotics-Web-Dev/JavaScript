import { BranchOfficeModel, BranchOffice, BranchOfficeList } from '@core/models';

export const emptyBranchOfficeModel: BranchOfficeModel = {
  id: 0,
  name: '',
  country: '',
  state_province: '',
  city: '',
  address: '',
  cellphone_number: '',
  status_description: '',
  status: false,
  create_at: '',
  update_at: '',
  postal_code: '',
  phone_number: '',
  email: '',
  img: null,
};

export const emptyBranchOffice: BranchOffice = {
  ok: '',
  error: '',
  data: emptyBranchOfficeModel,
  msg: '',
};

export const emptyBranchOfficeList: BranchOfficeList = {
  ok: '',
  data: [],
  next: '',
  previous: '',
  count: 0,
  pages: 0,
  msg: '',
};
