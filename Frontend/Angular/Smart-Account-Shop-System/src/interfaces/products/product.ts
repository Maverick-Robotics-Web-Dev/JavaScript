export interface ProductModel {
  ok: string;
  data: ProductData;
}

export interface ProductData {
  id: number;
  fk_supplier: string;
  fk_category: string;
  fk_brand: string;
  fk_user_employee: string;
  status: boolean;
  status_description: null | string;
  create_at: string;
  update_at: null | string;
  barcode: string;
  code: string;
  name: string;
  stock: string;
  presentation: string;
  purchase_price: string;
  sale_price: string;
  number_sale: null | string;
  img: string;
  due_date: null | string;
  description: null | string;
}
