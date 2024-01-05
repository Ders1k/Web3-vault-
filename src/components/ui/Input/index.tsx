import { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

interface IInputProps
  extends Pick<
    InputHTMLAttributes<HTMLInputElement>,
    | 'type'
    | 'value'
    | 'required'
    | 'placeholder'
    | 'onChange'
    | 'name'
    | 'inputMode'
    | 'id'
  > {
  label?: string;
}

const Input = ({
  label,
  name,
  type = 'text',
  value,
  required = false,
  placeholder,
  inputMode = 'text',
  id,
  onChange
}: IInputProps) => {
  return (
    <>
      {label && (
        <label
          className={styles.input__label}
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        autoComplete={name}
        className={styles.input}
        type={type}
        id={id}
        value={value}
        required={required}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        inputMode={inputMode}
      />
    </>
  );
};

export default Input;
