import styles from "./error-modal.module.scss";

type ErrorModalProps = {
  readonly title: string;
  readonly description: string;
  readonly onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const ErrorModal: React.FC<ErrorModalProps> = ({
  title,
  description,
  onClick,
}) => {
  const xSymbol = "\u2715"; //HTML Entity https://www.toptal.com/designers/htmlarrows/symbols/multiplication-x/

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h4 className={styles["modal-title"]}>{title}</h4>
        <p className={styles["modal-description"]}>{description}</p>
        <button className={styles["modal-button"]} onClick={onClick}>
          {xSymbol}
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
