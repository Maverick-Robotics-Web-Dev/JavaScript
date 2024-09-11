export interface CashRegisterClosingModel {
  ok: string;
  data: CashRegisterClosingData;
}

export interface CashRegisterClosingData {
  id: number;
  fk_cash_register: string;
  fk_user_employee: string;
  closing_date: string;
  total_sales: string;
  total_transfers: string;
  total_cash: string;
  missing_or_surplus: string;
  closing_amount: string;
  remark: null | string;
}
