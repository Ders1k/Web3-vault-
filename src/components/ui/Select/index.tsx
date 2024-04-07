import { ComponentProps, useRef } from 'react';
import styles from './Select.module.css';

interface ISelectProps
  extends Pick<
    ComponentProps<'select'>,
    'value' | 'onChange' | 'required' | 'name' | 'id'
  > {
  label?: string;
  placeholder?: string;
  options?: string[] | readonly bigint[];
}

const Select = ({
  onChange,
  label,
  name,
  value,
  required = false,
  placeholder,
  options,
  id
}: ISelectProps) => {
  const selectRef = useRef<HTMLSelectElement | null>(null);
  const handleResetFocus = () => {
    selectRef.current?.blur();
  };

  return (
    <>
      {label && (
        <label
          className={styles.label}
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <select
        className={styles.select}
        name={name}
        id={id}
        required={required}
        value={value}
        onChange={e => {
          handleResetFocus();
          onChange?.(e);
        }}
        ref={selectRef}
      >
        <option hidden={!!placeholder}>{placeholder}</option>
        {options?.map(option => (
          <option
            key={option.toString()}
            value={option.toString()}
          >
            {option.toString()}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
