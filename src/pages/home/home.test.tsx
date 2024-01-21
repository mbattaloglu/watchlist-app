import { render, screen } from "@testing-library/react";
import { ModalContext } from "../../contexts/modalContext/modal.context";
import Home from "./home.page";

describe("Home", () => {
  it("should render without crashing", () => {
    const modal = null;

    const closeModal = jest.fn();
    const setModal = jest.fn();
    render(
      <ModalContext.Provider value={{ modal, setModal, closeModal }}>
        <Home />
      </ModalContext.Provider>,
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(
      screen.getByText("Search for stocks to add your watchlist."),
    ).toBeInTheDocument();
  });
  it("should render a modal when modalContext is provided", () => {
    const modal = {
      title: "Test Modal",
      description: "This is a test modal",
    };

    const closeModal = jest.fn();
    const setModal = jest.fn();
    render(
      <ModalContext.Provider value={{ modal, setModal, closeModal }}>
        <Home />
      </ModalContext.Provider>,
    );

    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("This is a test modal")).toBeInTheDocument();
  });
});
