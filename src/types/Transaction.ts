import { BaseResponse } from './BaseResponse';

export type Transaction = {
  id: string;
  from: string;
  to: string;
  amount: number;
  refId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TransactionResponse = {
  id: string;
  from: string;
  to: string;
  amount: number;
  refId: string;
  createdAt: string;
  updatedAt: string;
}

export type QueryTransactionResponse = BaseResponse<TransactionResponse[]>;

export type TransactionQuery = {
  index: Omit<keyof Transaction, 'amount'> | 'ALL';
  indexValue: string | 'ALL';
}