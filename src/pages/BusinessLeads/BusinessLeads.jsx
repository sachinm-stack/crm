import { useState } from "react";
import { FiSettings, FiDownload } from "react-icons/fi";
import DataTable from "../../components/Table/DataTable";
import leads from "../../data/leads.json";
import "./BusinessLeads.css";

const BusinessLeads = () => {
  const [activeTab, setActiveTab] = useState("Unallocated");
  const [selectedRows, setSelectedRows] = useState([]);

  // DATE FILTER
  const [startDate, setStartDate] = useState("2021-05-26");
  const [endDate, setEndDate] = useState("2026-06-30");

  // TABLE COLUMNS
  const columns = [
    { label: "Name", accessor: "name" },
    { label: "Phone", accessor: "phone" },
    { label: "Created", accessor: "createdAt" },
    { label: "Email", accessor: "email" },
    { label: "Showroom", accessor: "showroom" },
    { label: "Status", accessor: "status" },
    { label: "Lead Source", accessor: "leadSource" },
    { label: "Allocated To", accessor: "allocatedTo" },
    { label: "Product", accessor: "product" },
    { label: "Follow Up Date", accessor: "followUpDate" },
  ];

  // TAB FILTER
  const tabFilteredData =
    activeTab === "Unallocated"
      ? leads.filter((lead) => lead.allocatedTo === "")
      : leads.filter((lead) => lead.allocatedTo !== "");

  // DATE FILTER
  const filteredData = tabFilteredData.filter((lead) => {
    return (
      lead.createdAt >= startDate &&
      lead.createdAt <= endDate
    );
  });

  // EXPORT CSV
  const exportCSV = () => {
    const headers = columns.map((col) => col.label).join(",");

    const rows = filteredData.map((item) =>
      columns
        .map((col) => `"${item[col.accessor] || ""}"`)
        .join(",")
    );

    const csvContent = [headers, ...rows].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "business-leads.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="page">

      {/* PAGE HEADER */}

      <div className="page-header">

        <h1>Leads Page</h1>

        <div className="page-actions">

          {/* FILTER BUTTON */}

          <button className="green-btn">
            Filter
          </button>

          {/* DATE RANGE */}

          <div className="date-range-container">

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <span>to</span>

            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />

          </div>

        </div>

      </div>

      {/* TABS */}

      <div className="tabs-row">

        <div className="tabs">

          <button
            className={
              activeTab === "Unallocated"
                ? "tab active-tab"
                : "tab"
            }
            onClick={() => {
              setActiveTab("Unallocated");
              setSelectedRows([]);
            }}
          >
            Unallocated
          </button>

          <button
            className={
              activeTab === "Allocated"
                ? "tab active-tab"
                : "tab"
            }
            onClick={() => {
              setActiveTab("Allocated");
              setSelectedRows([]);
            }}
          >
            Allocated
          </button>

          <button className="settings-btn">
            <FiSettings />
          </button>

        </div>

      </div>

      {/* TABLE */}

      <div className="table-card">

        <DataTable
          columns={columns}
          data={filteredData}
          onSelectionChange={setSelectedRows}
        />

        {/* ACTION BUTTONS */}

        <div className="table-actions">

          <button
            className={
              selectedRows.length > 0
                ? "green-btn"
                : "disabled-btn"
            }
            disabled={selectedRows.length === 0}
          >
            ALLOCATE ▼
          </button>

          <button
            className="blue-btn"
            onClick={exportCSV}
          >
            <FiDownload />
            Export
          </button>

        </div>

      </div>

    </div>
  );
};

export default BusinessLeads;