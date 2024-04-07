import { useState } from 'react';
import Deposit from './Deposit';
import VaultNavButton from './VaultNavButton';
import styles from './VaultScreen.module.css';
import Withdraw from './Withdraw';

interface ISections {
  [key: string]: React.ReactNode;
}

const VaultScreen = () => {
  const [activePage, setActivePage] = useState('deposit');

  const sections: ISections = { deposit: <Deposit />, withdraw: <Withdraw /> };
  
  const handleChangePage = (page: string) => {
    return () => {
      setActivePage(page);
    };
  };

  return (
    <div className={styles.vault__wrapper}>
      <section className={styles.vault__container}>
        <div className={styles.vault__buttons__container}>
          <VaultNavButton
            onClick={handleChangePage('deposit')}
            isActive={activePage === 'deposit'}
          >
            deposit
          </VaultNavButton>
          <VaultNavButton
            onClick={handleChangePage('withdraw')}
            isActive={activePage === 'withdraw'}
          >
            withdraw
          </VaultNavButton>
        </div>
        <div className={styles.vault__content}>{sections[activePage]}</div>
      </section>
    </div>
  );
};

export default VaultScreen;
