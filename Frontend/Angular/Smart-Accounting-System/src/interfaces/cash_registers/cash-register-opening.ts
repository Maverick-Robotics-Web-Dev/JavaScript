export interface CashRegisterOpeningModel {
  ok: string;
  data: CashRegisterOpeningData;
}

export interface CashRegisterOpeningData {
  id: number;
  fk_cash_register: string;
  fk_user_employee: string;
  opening_date: string;
  opening_amount: string;
  missing_or_surplus: string;
}
