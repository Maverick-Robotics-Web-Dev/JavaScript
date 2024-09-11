export interface SaleModel {
  ok: string;
  data: SaleData;
}

export interface SaleData {
  id: number;
  fk_client: string;
  fk_sale_voucher_type: string;
  fk_way_to_pay: string;
  fk_user_employee: string;
  detail: SaleDetail[];
  status: boolean;
  status_description: string;
  create_at: string;
  update_at: null | string;
  establishment: string;
  billing_number: string;
  voucher_number: string;
  date: string;
  vat_percentage: string;
  vat: string;
  sub_total: string;
  total: string;
}

export interface SaleDetail {
  id: number;
  fk_sale: string;
  fk_product: string;
  status: boolean;
  status_description: string;
  create_at: string;
  update_at: null | string;
  quantity: string;
  price: string;
  total: string;
}
