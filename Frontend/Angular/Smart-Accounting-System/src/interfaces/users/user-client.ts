export interface UserClientModel {
  ok: string;
  data: UserClientData;
}

export interface UserClientData {
  id: number;
  fk_client: string;
  status: boolean;
  status_description: string;
  create_at: string;
  update_at: null | string;
  user_name: string;
  password: string;
  login: boolean;
}
