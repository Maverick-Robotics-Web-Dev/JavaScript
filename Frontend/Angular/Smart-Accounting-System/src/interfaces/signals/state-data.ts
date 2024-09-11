export interface SignalState {
  data: any;
  msg?: string;
  status: string;
  error: any;
}

export const defaultState: SignalState = {
  data: '',
  msg: '',
  status: 'loading',
  error: '',
};
