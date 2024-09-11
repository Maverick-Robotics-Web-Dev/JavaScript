export interface ClientCheckModel {
  ok: string;
  data: ClientCheckData;
}

export interface ClientCheckData {
  id: number;
  fk_client: string;
  fk_user_employee: string;
  create_at: string;
  update_at: null | string;
  date_admission: string;
  detail: string;
  voucher_type: string;
  voucher_number: string;
  deposit_date: string;
  bank: string;
  account_number: string;
  check_number: string;
  owner: string;
  amount: string;
  status: string;
  deposited_in: null | string;
  deposit_number: null | string;
  endorsement_date: null | string;
  discharge_date: null | string;
  beneficiary: null | string;
  remark: string;
}
