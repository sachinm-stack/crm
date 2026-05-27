import { useState, useMemo } from "react";
import './DataTable.css';
import {
  FiChevronUp,
  FiChevronDown,
  FiSearch,
} from "react-icons/fi";

const DataTable = ({
  columns,
  data,
  rowsPerPageOptions = [10, 25, 50],
  selectable = true,
  onSelectionChange,
}) => {
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("name");

  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [selectedRows, setSelectedRows] = useState([]);

  // SEARCH
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item[searchField]
        ?.toString()
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [data, search, searchField]);

  // SORT
  const sortedData = useMemo(() => {
    const sortable = [...filteredData];

    if (sortField) {
      sortable.sort((a, b) => {
        const valueA = a[sortField]?.toString().toLowerCase();
        const valueB = b[sortField]?.toString().toLowerCase();

        if (valueA < valueB) {
          return sortOrder === "asc" ? -1 : 1;
        }

        if (valueA > valueB) {
          return sortOrder === "asc" ? 1 : -1;
        }

        return 0;
      });
    }

    return sortable;
  }, [filteredData, sortField, sortOrder]);

  // PAGINATION
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // SORT FUNCTION
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // CHECKBOX
  const handleSelectRow = (id) => {
    let updatedRows;

    if (selectedRows.includes(id)) {
      updatedRows = selectedRows.filter((rowId) => rowId !== id);
    } else {
      updatedRows = [...selectedRows, id];
    }

    setSelectedRows(updatedRows);

    if (onSelectionChange) {
      onSelectionChange(updatedRows);
    }
  };

  // SELECT ALL
  const handleSelectAll = () => {
    if (selectedRows.length === paginatedData.length) {
      setSelectedRows([]);
      onSelectionChange && onSelectionChange([]);
    } else {
      const allIds = paginatedData.map((item) => item.id);
      setSelectedRows(allIds);
      onSelectionChange && onSelectionChange(allIds);
    }
  };

  return (
    <div className="table-wrapper">

      {/* TOP BAR */}

      <div className="table-top">

        <div className="search-box">
          <select
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="phone">Phone</option>
            <option value="email">Email</option>
          </select>

          <div className="search-input">
            <FiSearch />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

      </div>

      {/* TABLE */}

      <table className="custom-table">
        <thead>
          <tr>

            {selectable && (
              <th>
                <input
                  type="checkbox"
                  checked={
                    paginatedData.length > 0 &&
                    selectedRows.length === paginatedData.length
                  }
                  onChange={handleSelectAll}
                />
              </th>
            )}

            {columns.map((column) => (
              <th
                key={column.accessor}
                onClick={() => handleSort(column.accessor)}
              >
                <div className="th-content">
                  {column.label}

                  <span className="sort-icons">
                    <FiChevronUp />
                    <FiChevronDown />
                  </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>

          {paginatedData.length > 0 ? (
            paginatedData.map((row) => (
              <tr key={row.id}>

                {selectable && (
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => handleSelectRow(row.id)}
                    />
                  </td>
                )}

                {columns.map((column) => (
                  <td key={column.accessor}>

                    {column.accessor === "verificationStatus" ? (
                      <span
                        className={
                          row[column.accessor] === "Verified"
                            ? "status verified"
                            : "status not-verified"
                        }
                      >
                        {row[column.accessor]}
                      </span>
                    ) : (
                      row[column.accessor]
                    )}

                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1} className="no-data">
                No data found
              </td>
            </tr>
          )}

        </tbody>
      </table>

      {/* PAGINATION */}

      <div className="pagination-wrapper">

        <div className="entries-text">
          Showing{" "}
          {(currentPage - 1) * rowsPerPage + 1}
          {" "}to{" "}
          {Math.min(currentPage * rowsPerPage, sortedData.length)}
          {" "}of {sortedData.length} entries
        </div>

        <div className="pagination-controls">

          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
          >
            First
          </button>

          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? "active-page" : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
          >
            Last
          </button>

          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {rowsPerPageOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

        </div>
      </div>
    </div>
  );
};

export default DataTable;