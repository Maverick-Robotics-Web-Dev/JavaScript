export interface CreditNoteModel {
  ok: string;
  data: CreditNoteData;
}

export interface CreditNoteData {
  id: number;
  fk_client: string;
  fk_user_employee: string;
  detail: CreditNoteDetail[];
  status: boolean;
  status_description: string;
  create_at: string;
  update_at: null | string;
  voucher_number: string;
  date: string;
  vat_percentage: string;
  vat: string;
  sub_total: string;
  total: string;
}

export interface CreditNoteDetail {
  id: number;
  fk_credit_note: string;
  fk_product: string;
  status: boolean;
  status_description: string;
  create_at: string;
  update_at: null | string;
  quantity: string;
  price: string;
  total: string;
}
