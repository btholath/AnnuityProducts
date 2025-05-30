import React from "react";
import { render, screen } from "@testing-library/react";
import PolicyModal from "../PolicyModal.jsx";


test("renders PolicyModal in edit mode", () => {
  render(
    <PolicyModal
      show={true}
      onClose={() => {}}
      onSave={() => {}}
      policy={{ policy_number: "P123", type: "Fixed", customer: { name: "Alice", age: 55 }, premium: 1000, payout_frequency: "Monthly", payout_amount: 200, start_date: "2023-01-01", status: "Active" }}
      setPolicy={() => {}}
      isEdit={true}
    />
  );
  expect(screen.getByDisplayValue(/P123/)).toBeInTheDocument();
});