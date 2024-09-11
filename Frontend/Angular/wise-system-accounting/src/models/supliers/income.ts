export interface IncomeModel {
  ok: string;
  data: IncomeData;
}

export interface IncomeData {
  id: number;
  fk_supplier: string;
  fk_sale_voucher_type: string;
  fk_user_employee: string;
  detail: IncomeDetail[];
  status: boolean;
  status_description: string;
  create_at: string;
  update_at: null | string;
  establishment: string;
  billing_number: string;
  voucher_number: string;
  income_date: string;
  vat_percentage: string;
  vat: string;
  sub_total: string;
  total: string;
}

export interface IncomeDetail {
  id: number;
  fk_income: string;
  fk_product: string;
  status: boolean;
  status_description: string;
  create_at: string;
  update_at: null | string;
  quantity: string;
  purchase_price: string;
  sale_price: string;
  total: string;
}
