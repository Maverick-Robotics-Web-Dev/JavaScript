export interface VoucherTypeModel {
  ok: string;
  data: VoucherTypeData;
}

export interface VoucherTypeData {
  id: number;
  fk_user_employee: string;
  status: boolean;
  status_description: string;
  create_at: string;
  update_at: null | string;
  name: string;
  description: null | string;
}
