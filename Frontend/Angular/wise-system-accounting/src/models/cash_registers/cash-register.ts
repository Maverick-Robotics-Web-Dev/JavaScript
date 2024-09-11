export interface CashRegisterModel {
  ok: string;
  data: CashRegisterData;
}

export interface CashRegisterData {
  id: number;
  fk_user_employee: string;
  status: boolean;
  status_description: null | string;
  create_at: string;
  update_at: null | string;
  number: string;
  condition: boolean;
}
