export interface UserEmployeeModel {
  ok: string;
  data: UserEmployeeData;
}

export interface UserEmployeeData {
  id: number;
  user_name: string;
  password: string;
  login: boolean;
}
