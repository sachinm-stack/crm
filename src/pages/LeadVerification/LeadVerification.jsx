import { useState } from "react";
import StatCard from "../../components/StatCard/StatCard";
import DataTable from "../../components/Table/DataTable";
import leadsData from "../../data/leads.json";

const LeadVerification = () => {

  const [leads, setLeads] = useState(leadsData);
  const [selectedRows, setSelectedRows] = useState([]);

  const columns = [
    { label: "Name", accessor: "name" },
    { label: "Phone", accessor: "phone" },
    { label: "Entity", accessor: "entity" },
    { label: "Product", accessor: "product" },
    { label: "Showroom", accessor: "showroom" },
    { label: "Lead Source", accessor: "leadSource" },
    { label: "CRM Status", accessor: "crmStatus" },
    { label: "Status Remarks", accessor: "statusRemarks" },
    { label: "Verification Status", accessor: "verificationStatus" },
    { label: "Created", accessor: "createdAt" },
    { label: "User Text", accessor: "userText" },
  ];

  // DYNAMIC COUNTS

  const totalLeads = leads.length;

  const autoVerified = leads.filter(
    (lead) => lead.verificationStatus === "Auto Verified"
  ).length;

  const manuallyVerified = leads.filter(
    (lead) => lead.verificationStatus === "Verified"
  ).length;

  const notVerified = leads.filter(
    (lead) => lead.verificationStatus === "Not Verified"
  ).length;

  const inProgress = leads.filter(
    (lead) => lead.verificationStatus === "In Progress"
  ).length;

  // VERIFY FUNCTION

  const verifySelected = () => {

    const updated = leads.map((lead) => {

      if (selectedRows.includes(lead.id)) {
        return {
          ...lead,
          verificationStatus: "Verified",
        };
      }

      return lead;
    });

    setLeads(updated);
    setSelectedRows([]);
  };

  return (
    <div className="page">

      {/* PAGE TITLE */}

      <div className="page-header">
        <h1>Lead Verification</h1>

        <button className="green-btn">
          View Rules
        </button>
      </div>

      {/* STAT CARDS */}

      <div className="stats-grid">

        <StatCard
          value={totalLeads}
          label="TOTAL LEADS"
          type="white"
        />

        <StatCard
          value={autoVerified}
          label="AUTO-VERIFIED"
          type="green"
        />

        <StatCard
          value={manuallyVerified}
          label="MANUALLY VERIFIED"
          type="blue"
        />

        <StatCard
          value={notVerified}
          label="NOT VERIFIED"
          type="red"
        />

        <StatCard
          value={inProgress}
          label="IN PROGRESS"
          type="yellow"
        />

      </div>

      {/* TABLE */}

      <div className="table-card">

        <DataTable
          columns={columns}
          data={leads}
          onSelectionChange={setSelectedRows}
        />

        {/* BUTTONS */}

        <div className="table-actions">

          <button
            className={
              selectedRows.length > 0
                ? "green-btn"
                : "disabled-btn"
            }
            disabled={selectedRows.length === 0}
            onClick={verifySelected}
          >
            VERIFY ▼
          </button>

          <button
            className={
              selectedRows.length > 0
                ? "green-btn"
                : "disabled-btn"
            }
            disabled={selectedRows.length === 0}
          >
            EDIT
          </button>

        </div>

      </div>

    </div>
  );
};

export default LeadVerification;