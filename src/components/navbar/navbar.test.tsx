import { render, screen } from "@testing-library/react";
import Navbar from "./navbar.component";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from "../../contexts/modalContext/modal.context";

describe("navbar test suite", () => {
  it("should render the navbar", () => {
    const { container } = render(
      <BrowserRouter>
        <ModalProvider>
          <Navbar />
        </ModalProvider>
      </BrowserRouter>,
    );

    expect(container).toBeTruthy();
    expect(screen.getByText("Dow Jones Stocks")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Watchlist")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });
});
