export interface OwnCheckModel {
  ok: string;
  data: OwnCheckData;
}

export interface OwnCheckData {
  id: number;
  fk_user_employee: string;
  create_at: string;
  update_at: null | string;
  payment_date: string;
  beneficiary: string;
  detail: string;
  voucher_type: string;
  voucher_number: null | string;
  deposit_date: string;
  bank: string;
  account_number: string;
  check_number: string;
  check_owner: string;
  amount: string;
  status: string;
  remark: null | string;
}
