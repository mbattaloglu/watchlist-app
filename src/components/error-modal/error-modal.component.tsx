import styles from "./error-modal.module.scss";

type ErrorModalProps = {
  title: string;
  description: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const ErrorModal: React.FC<ErrorModalProps> = ({
  title,
  description,
  onClick,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h4 className={styles["modal-title"]}>{title}</h4>
        <p className={styles["modal-description"]}>{description}</p>
        <button className={styles["modal-button"]} onClick={onClick}>
          &#10005;
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
