export interface CategoryModel {
  ok: string;
  data: CategoryData;
}

export interface CategoryData {
  id: number;
  fk_user_employee: string;
  status: boolean;
  status_description: string;
  create_at: string;
  update_at: null | string;
  code: string;
  name: string;
  description: string;
  img: string;
}
