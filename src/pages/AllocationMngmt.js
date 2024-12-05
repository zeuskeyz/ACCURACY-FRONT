import React from "react";
import FlexibleTable from "../components/FlexibleTable";

export const AllocationMngmt = () => {
  const addButton = {
    path: "/allocations/new",
    text: "Add Allocation",
    icon: "bi bi-bag-plus-fill",
  };

  const columns = [
    { header: "Allocation ID", key: "number" },
    { header: "Created By", key: "creator" },
    { header: "Market", key: "market" },
    { header: "Status", key: "status" },
  ];

  const dataPath = "/allocations";
  const editPath = "/allocations/edit/:id";
  const deletePath = "/allocations";

  return (
    <>
      <FlexibleTable
        columns={columns}
        dataPath={dataPath}
        editPath={editPath}
        deletePath={deletePath}
        button={addButton}
      />
    </>
  );
};
