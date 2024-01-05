import { NavLink } from 'react-router-dom';
import logo from '@/assets/logo.svg';
import ConnectWalletButton from './ConnectWalletButton';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header__container}>
      <nav>
        <img
          src={logo}
          alt='logo'
          width={100}
          height={30}
          className={styles.header__logo}
        />
        <ul>
          <li>
            <NavLink
              to='/'
              title='To Vault'
              className={({ isActive }) =>
                isActive ? styles.active__link : ''
              }
            >
              vault
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/deposits'
              title='To Deposits'
              className={({ isActive }) =>
                isActive ? styles.active__link : ''
              }
            >
              deposits
            </NavLink>
          </li>
        </ul>
      </nav>
      <ConnectWalletButton />
    </header>
  );
};

export default Header;
