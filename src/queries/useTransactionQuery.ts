const { VITE_AWS_API_ENDPOINT } = import.meta.env;
import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';
import { QueryTransactionResponse, Transaction, TransactionQuery, TransactionResponse } from '../types/Transaction';

export const fetchTransaction = async ({ index, indexValue }: TransactionQuery) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const res = await axios.post<QueryTransactionResponse>(`${VITE_AWS_API_ENDPOINT}/transaction/query`, {
    query: {
      index,
      indexValue
    }
  });
  return res.data.response
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    .map((item: TransactionResponse) => ({
      ...item,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
    })) as Transaction[];
}

export const useTransactionsQuery = ({ index, indexValue }: TransactionQuery) => {
  return useQuery<Transaction[]>(
    ['transactions', index, indexValue], 
    () => fetchTransaction({ index, indexValue })
  );
}

export const useTransactionQuery = (transactionId: string) => {
  const queryClient = useQueryClient();
  return useQuery(['transaction', transactionId], async () => {
    const transactions = queryClient.getQueryData<Transaction[]>(['transactions', 'ALL', 'ALL']);

    if (transactions) {
      return transactions.find((transaction) => transaction.id === transactionId);
    }

    const singleResponse = await axios.post<QueryTransactionResponse>(`${VITE_AWS_API_ENDPOINT}/transaction/query`, {
      query: {
        index: 'id',
        indexValue: transactionId
      }
    });

    const item = singleResponse.data.response[0];

    return {...item, 
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt)
    } as Transaction;
  })
}