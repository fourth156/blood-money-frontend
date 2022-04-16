import { Box, TextInput } from '@mantine/core';
import { useSearch } from 'react-location';
import { LocationGenerics } from '../App';
import { useTransactionQuery } from '../queries/useTransactionQuery';
import { Transaction as ITransaction } from '../types/Transaction';

export default function Transaction() {
  const { transactionId } = useSearch<LocationGenerics>();
  const { isLoading, data } = useTransactionQuery(transactionId!);
  
  return <>{isLoading ? 'Loading...' : data && <Box>
    {(Object.keys(data) as (keyof ITransaction)[]).map((k) => 
      <TextInput
        key={k}
        disabled
        label={k}
        value={JSON.stringify(data[k], null, 2).replaceAll('"', '')}
      />
    )}
  </Box>}</>
}