import { useState } from 'react';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from 'wagmi';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import tokenAbi from '@/contract/abi/tokenAbi';
import vaultAbi from '@/contract/abi/vaultAbi';
import { tokenContract, vaultContract } from '@/contract/contracts';
import { useDebounce } from '@/hooks/useDebounce';
import styles from './Deposit.module.css';

const initialValue = { amount: '' };

const Deposit = () => {
  const [depositValue, setDepositValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDepositValue(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const debouncedDepositValue = useDebounce(depositValue.amount, 100);

  const { config: tokenConfig } = usePrepareContractWrite({
    address: tokenContract, //'0xb2d49C02277059b16f61D0E15a9724fAaC19941A'
    abi: tokenAbi,
    functionName: 'approve',
    args: [
      vaultContract, // '0x4F52b9f1Ee54724B6b2cCF16254cbbd94BB080f8'
      BigInt(debouncedDepositValue)
    ]
  });

  const { data: tokenData, write: writeToken } = useContractWrite(tokenConfig);

  const { isError, error, isSuccess } = useWaitForTransaction({
    hash: tokenData?.hash
  });

  const { config: vaultConfig } = usePrepareContractWrite({
    address: vaultContract, //'0x4F52b9f1Ee54724B6b2cCF16254cbbd94BB080f8'
    abi: vaultAbi,
    functionName: 'deposit',
    args: [BigInt(debouncedDepositValue)],
    enabled: isSuccess
  });

  const { data: vaultData, write: writeVault } = useContractWrite(vaultConfig);

  const { isError: isErrorVaultTransaction, error: errorVaultTransaction } =
    useWaitForTransaction({
      hash: vaultData?.hash
    });

  const handleApprove = (e: React.FormEvent) => {
    e.preventDefault();
    writeToken?.();
  };

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    writeVault?.();
    setDepositValue(initialValue);
  };

  return (
    <article className={styles.deposit}>
      <form
        className={styles.deposit__form}
        onSubmit={handleDeposit}
      >
        <div className={styles.deposit__input__container}>
          <Input
            id='amount'
            value={depositValue.amount}
            onChange={handleChange}
            name='amount'
            label='Amount'
            placeholder='0'
            type='number'
            inputMode='numeric'
            required
          />
          {isErrorVaultTransaction && <p>{errorVaultTransaction?.message}</p>}
          {isError && <p>{error?.message}</p>}
        </div>
        <div className={styles.deposit__buttons__container}>
          <Button
            title='Approve'
            type='button'
            onClick={handleApprove}
            disabled={BigInt(depositValue.amount) <= 0}
          >
            Approve
          </Button>
          <Button
            title='Deposit'
            type='submit'
            disabled={!isSuccess || BigInt(depositValue.amount) <= 0}
          >
            Deposit
          </Button>
        </div>
      </form>
    </article>
  );
};

export default Deposit;
