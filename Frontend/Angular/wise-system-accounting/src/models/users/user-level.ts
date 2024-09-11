export interface UserLevelModel {
  ok: string;
  data: UserLevelData;
}

export interface UserLevelData {
  id: number;
  fk_user_employee: string;
  status: boolean;
  status_description: string;
  create_at: string;
  update_at: null | string;
  name: string;
}
