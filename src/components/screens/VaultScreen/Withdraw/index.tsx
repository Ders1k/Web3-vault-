import { useState } from 'react';
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from 'wagmi';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import vaultAbi from '@/contract/abi/vaultAbi';
import { vaultContract } from '@/contract/contracts';
import { useDebounce } from '@/hooks/useDebounce';
import styles from './Withdraw.module.css';

const initialValue = { depositId: '' };

const Withdraw = () => {
  const [withdrawValue, setWithdrawValue] = useState(initialValue);

  const debouncedWithdrawValue = useDebounce(withdrawValue.depositId, 100);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setWithdrawValue(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { data } = useContractRead({
    address: vaultContract, //'0x4F52b9f1Ee54724B6b2cCF16254cbbd94BB080f8'
    abi: vaultAbi,
    functionName: 'getDeposits'
  });

  const { config, isError } = usePrepareContractWrite({
    address: vaultContract, //'0x4F52b9f1Ee54724B6b2cCF16254cbbd94BB080f8'
    abi: vaultAbi,
    functionName: 'withdraw',
    args: [BigInt(debouncedWithdrawValue)],
    enabled: !!debouncedWithdrawValue
  });

  const { data: withdrawData, write: writeWithdraw } = useContractWrite(config);

  const { isError: isErrorWithdrawTransaction } = useWaitForTransaction({
    hash: withdrawData?.hash
  });

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    writeWithdraw?.();
    setWithdrawValue(initialValue);
  };

  return (
    <article className={styles.withdraw}>
      <form
        className={styles.withdraw__form}
        onSubmit={handleSubmitForm}
      >
        <div className={styles.withdraw__input__container}>
          <Input
            id='deposit'
            label='deposit ID'
            placeholder='0'
            name='depositId'
            type='number'
            inputMode='numeric'
            onChange={handleChange}
            required={withdrawValue.depositId.length < 1}
            value={withdrawValue.depositId}
          />
        </div>
        {isErrorWithdrawTransaction && <p>Error while transaction</p>}
        {isError && !!debouncedWithdrawValue && (
          <p>Deposit does not found or deposit value equal zero</p>
        )}
        <div className={styles.dividing__stroke} />
        <Select
          placeholder='Select from existing deposits'
          name='depositId'
          onChange={handleChange}
          required={withdrawValue.depositId.length < 1}
          value={withdrawValue.depositId}
          options={data}
        />
        <Button
          title='Withdraw'
          type='submit'
          disabled={withdrawValue.depositId.length < 1}
        >
          Withdraw
        </Button>
      </form>
    </article>
  );
};

export default Withdraw;
