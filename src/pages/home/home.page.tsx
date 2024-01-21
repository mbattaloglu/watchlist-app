import { useContext } from "react";
import ErrorModal from "../../components/error-modal/error-modal.component";
import commonStyles from "../../styles/common-styles.module.scss";
import { ModalContext } from "../../contexts/modalContext/modal.context";

const Home: React.FC = () => {
  const modalContext = useContext(ModalContext);

  const { modal, closeModal } = modalContext;

  return (
    <div className={commonStyles.container}>
      <h1>Home</h1>
      <div style={{ marginTop: "1rem" }}>
        <p>Search for stocks to add your watchlist.</p>
      </div>
      {modalContext && modal && (
        <ErrorModal
          title={modal.title}
          description={modal.description}
          onClick={closeModal}
        />
      )}
    </div>
  );
};

export default Home;
