import { ComponentProps } from 'react';
import styles from './Button.module.css';

interface IButtonProps
  extends Pick<
    ComponentProps<'button'>,
    'title' | 'type' | 'onClick' | 'children' | 'disabled'
  > {}

const Button = ({ children, type, title, disabled, onClick }: IButtonProps) => {
  return (
    <button
      className={styles.button}
      type={type}
      onClick={onClick}
      title={title}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
