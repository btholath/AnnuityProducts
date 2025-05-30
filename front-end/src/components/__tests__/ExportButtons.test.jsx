import React from "react";

import { render, screen } from "@testing-library/react";
import ExportButtons from "../ExportButtons.jsx";

test("renders ExportButtons without crashing", () => {
  render(<ExportButtons data={[]} columns={[]} />);
  expect(screen.getByText(/export to excel/i)).toBeInTheDocument();
});