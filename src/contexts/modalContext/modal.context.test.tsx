import { render, screen, fireEvent } from "@testing-library/react";
import { ModalProvider, ModalContext } from "./modal.context";
import { useContext } from "react";

describe("ModalProvider", () => {
  it("should set and clear the modal", () => {
    const TestComponent = () => {
      const context = useContext(ModalContext);

      if (!context) {
        throw new Error("ModalContext is undefined");
      }

      const { modal, setModal, closeModal } = context;

      return (
        <div>
          <button onClick={() => setModal("Test Title", "Test Description")}>
            Set Modal
          </button>
          <button onClick={closeModal}>Close Modal</button>
          {modal && (
            <div>
              {modal.title} - {modal.description}
            </div>
          )}
        </div>
      );
    };

    render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>,
    );

    fireEvent.click(screen.getByText("Set Modal"));
    expect(
      screen.getByText("Test Title - Test Description"),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText("Close Modal"));
    expect(
      screen.queryByText("Test Title - Test Description"),
    ).not.toBeInTheDocument();
  });
});
