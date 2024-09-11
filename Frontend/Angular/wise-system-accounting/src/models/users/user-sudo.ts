export interface UserSudoModel {
  ok: string;
  data: UserSudoData;
}

export interface UserSudoData {
  id: number;
  fk_employee: null | string;
  fk_user_level: null | string;
  last_login: string;
  status: boolean;
  status_description: string;
  create_at: string;
  update_at: string;
  user_name: string;
  password: string;
  login: boolean;
  is_superuser: boolean;
  is_staff: boolean;
  is_active: boolean;
}
