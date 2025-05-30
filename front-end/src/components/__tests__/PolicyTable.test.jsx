/** @jest-environment jsdom */
import React from "react";
import { render, screen } from "@testing-library/react";
import PolicyTable from "../PolicyTable.jsx";

test("renders PolicyTable with columns", () => {
  const mockPolicies = [
    {
      _id: "1",
      policy_number: "P123",
      type: "Fixed",
      customer: { name: "Alice" },
    },
  ];

  render(
    <PolicyTable
      loading={false}
      policies={mockPolicies}
      columnsToExport={["policy_number", "type", "customer.name"]}
      allColumns={["policy_number", "type", "customer.name"]}
      toggleColumn={() => {}}
      onEdit={() => {}}
      onDelete={() => {}}
      currentPage={1}
      totalPages={1}
      setCurrentPage={() => {}}
    />
  );

  expect(screen.getByText("P123")).toBeInTheDocument();
});
