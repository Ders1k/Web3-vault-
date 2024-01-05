import walletConnect from '@/assets/wallet-connect-logo.svg';
import walletDisconnect from '@/assets/wallet-disconnect-logo.svg';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import styles from './ConnectWalletButton.module.css';

const ConnectWalletButton = () => {
  const { connect } = useConnect({ connector: new InjectedConnector() });
  const { disconnect } = useDisconnect();
  const { address, isConnected  } = useAccount();

  const handleConnect = () => {
    connect();
    return;
  };

  const handleDisconnect = () => {
    disconnect();
    return;
  };

  if (isConnected || address) {
    return (
      <button
        className={styles.wallet__button}
        onClick={handleDisconnect}
        title='Disconnect wallet'
      >
        <span className={styles.wallet__button__text}>{address}</span>
        <img
          src={walletDisconnect}
          alt={'Disconnect wallet'}
        />
      </button>
    );
  }

  return (
    <button
      className={styles.wallet__button}
      onClick={handleConnect}
      title='Connect wallet'
    >
      connect wallet
      <img
        src={walletConnect}
        alt={'Connect wallet'}
      />
    </button>
  );
};

export default ConnectWalletButton;
