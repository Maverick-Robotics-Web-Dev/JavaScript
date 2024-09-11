import { HttpErrorResponse } from '@angular/common/http';

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

export interface WaytoPayRAllModel {
  ok: string;
  data: WaytoPayOutputData[];
}

export interface WaytoPayRModel {
  ok: string;
  data: WaytoPayOutputData;
}

export interface WaytoPayCUModel {
  ok: string;
  msg: string;
  data: WaytoPayOutputData;
}

export interface WaytoPayDModel {
  ok: string;
  msg: string;
}

export interface StateData {
  data: WaytoPayRAllModel | HttpErrorResponse;
  status: string;
}

export const waytopayEmptyAll: WaytoPayRAllModel = {
  ok: '',
  data: [],
};
