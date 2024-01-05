import styles from './DepositsFeed.module.css';

interface IDepositsFeedProps {
  data: readonly bigint[] | undefined;
  onClick: (row: bigint) => void;
}

const DepositsFeed = ({ data, onClick }: IDepositsFeedProps) => {
  return (
    <>
      {data?.length != 0 &&
        data?.map(row => (
          <p
            className={styles.deposits__id}
            onClick={() => onClick(row)}
            key={row.toString()}
          >
            {`Deposit id: ${row.toString()}`}
          </p>
        ))}
    </>
  );
};

export default DepositsFeed;
