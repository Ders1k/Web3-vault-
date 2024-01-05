import { useState } from 'react';
import { useContractRead } from 'wagmi';
import vaultAbi from '@/contract/abi/vaultAbi.ts';
import DepositsFeed from './DepositsFeed';
import styles from './DepositsScreen.module.css';
import { vaultContract } from '@/contract/contracts';

const initialValue = { id: '' };

const DepositsScreen = () => {
  const [deposit, setDeposit] = useState(initialValue);

  const { data, isError, isLoading, error } = useContractRead({
    address: vaultContract, //'0x4F52b9f1Ee54724B6b2cCF16254cbbd94BB080f8'
    abi: vaultAbi,
    functionName: 'getDeposits'
  });

  const { data: depositAmount, isLoading: isLoadingAmount } = useContractRead({
    address: vaultContract, //'0x4F52b9f1Ee54724B6b2cCF16254cbbd94BB080f8'
    abi: vaultAbi,
    functionName: 'deposits',
    args: [BigInt(deposit.id)]
  });

  const handleChangeDepositId = (row: bigint) => {
    setDeposit(prev => ({ ...prev, id: row.toString() }));
  };

  return (
    <div className={styles.deposits__wrapper}>
      {isLoading && <p>Loading...</p>}
      {isError && <p>{error?.message}</p>}
      <section className={styles.deposits__container}>
        <DepositsFeed
          data={data}
          onClick={handleChangeDepositId}
        />
        <div className={styles.dividing__stroke} />
        <p className={styles.deposits__amount}>
          {deposit.id != ''
            ? `Deposit amount for deposit with id ${deposit.id}:
          ${
            isLoadingAmount ? '...' : depositAmount && depositAmount.toString()
          }`
            : 'Deposit not selected'}
        </p>
      </section>
    </div>
  );
};

export default DepositsScreen;
