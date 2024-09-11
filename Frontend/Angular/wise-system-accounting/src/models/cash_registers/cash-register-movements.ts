export interface CashRegisterMovementsModel {
  ok: string;
  data: CashRegisterMovementsData;
}

export interface CashRegisterMovementsData {
  id: number;
  fk_cash_register: string;
  fk_way_to_pay: string;
  fk_user_employee: string;
  status: boolean;
  status_description: string;
  create_at: string;
  update_at: null | string;
  movements_date: string;
  movements_detail: string;
  movements_type: string;
  movements_amount: string;
}
