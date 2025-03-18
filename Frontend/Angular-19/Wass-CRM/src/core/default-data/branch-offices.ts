import { BranchOffice, BranchOfficeResponse, BranchOfficeResponseList } from '@core/models';

export const emptyBranchOffice: BranchOffice = {
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

export const emptyBranchOfficeResponse: BranchOfficeResponse = {
  ok: '',
  error: '',
  data: emptyBranchOffice,
  msg: '',
};

export const emptyBranchOfficeResponseList: BranchOfficeResponseList = {
  ok: '',
  data: [],
  next: '',
  previous: '',
  count: 0,
  pages: 0,
  msg: '',
};
