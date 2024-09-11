export interface WaytoPayInputData {
  name: string;
  description?: string;
  status?: boolean;
  status_description?: string;
  create_at?: string;
  update_at?: string;
  fk_user_employee: string;
}

export interface WaytoPayOutputData {
  id: number;
  fk_user_employee: string;
  status: boolean;
  status_description: string;
  create_at: string;
  update_at: string;
  name: string;
  description: string;
}

export interface WaytoPayRAll {
  ok: string;
  msg?: string;
  data: WaytoPayOutputData[];
}

export interface WaytoPayCRU {
  ok: string;
  msg?: string;
  data: WaytoPayOutputData;
}

// export interface WaytoPayCUModel {
//   ok: string;
//   msg: string;
//   data: WaytoPayOutputData;
// }

export interface WaytoPayDel {
  ok: string;
  msg: string;
}

export const EmptyDataW = {
  id: 0,
  fk_user_employee: 0,
  status: false,
  status_description: '',
  create_at: '',
  update_at: '',
  name: '',
  description: '',
};
