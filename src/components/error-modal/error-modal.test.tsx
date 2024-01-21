import { render, screen } from "@testing-library/react";
import ErrorModal from "./error-modal.component";

describe("error-modal test suite", () => {
  it("should render correctly", () => {
    const { container } = render(
      <ErrorModal title="Test Title" description="Test Description" />,
    );
    expect(container).toBeTruthy();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });
});
