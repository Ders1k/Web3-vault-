import { ButtonHTMLAttributes } from 'react';
import styles from './VaultNavButton.module.css';

interface IVaultNavButtonProps
  extends Pick<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'title' | 'type' | 'onClick' | 'children'
  > {
  isActive?: boolean;
}

const VaultNavButton = ({
  title,
  type,
  onClick,
  children,
  isActive
}: IVaultNavButtonProps) => {
  return (
    <button
      title={title}
      type={type}
      onClick={onClick}
      className={`${styles.vault__nav__button} ${
        !isActive && styles.vault__inactive__nav__button
      }`}
    >
      <span>{children}</span>
    </button>
  );
};

export default VaultNavButton;
