export type TTransactionType =
  | "sendmoney"
  | "cash-in"
  | "cash-out"
  | "withdrawal"
  | "deposit"
  | "commission";

export interface ITransaction {
  _id: string;
  from?: string;
  to?: string;
  amount: number;
  type: TTransactionType;
  timestamp: string;
}

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface ITransactionResponse {
  data: ITransaction[];
  meta: IMeta;
}

export interface ITransactionQuery {
  page?: number;
  limit?: number;
  type?: TTransactionType;
  startDate?: string;
  endDate?: string;
}
