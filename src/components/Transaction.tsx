import { Box, Drawer, TextInput } from '@mantine/core';
import { useMatch, useNavigate } from 'react-location';
import { useTransactionQuery } from '../queries/useTransactionQuery';
import { Transaction as ITransaction } from '../types/Transaction';

export default function Transaction() {
  const { params: { transactionId }} = useMatch();
  const { isLoading, data } = useTransactionQuery(transactionId);
  const navigate = useNavigate();
  
  return <Drawer padding='lg' opened onClose={() => navigate({ to: '/transactions' })} >
    {isLoading ? 'Loading...' : data && <Box>
      {(Object.keys(data) as (keyof ITransaction)[]).map((k) => 
        <TextInput
          key={k}
          disabled
          label={k}
          value={JSON.stringify(data[k], null, 2).replaceAll('"', '')}
        />
      )}
    </Box>}
  </Drawer>
}