import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { createTestStore } from "./testStore";
import { describe, it, expect } from "vitest";
import App from "../src/App";

export const renderWithStore = (
  ui: React.ReactElement,
  store = createTestStore(),
) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

describe("App", () => {
  it("should render", async () => {
    renderWithStore(<App />);

    await waitFor(() => {
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    });
  });
});
