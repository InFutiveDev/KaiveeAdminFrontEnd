import moment from "moment";
export const columns = [
    {
      name: "First Name",
      width: "100px",
      selector: "First_name",
      sortable: true,
      cell: (row) => row.First_name,
    },
    {
      name: "Last Name",
      width: "100px",
      selector: "Last_name",
      sortable: true,
      cell: (row) => row.Last_name,
    },
    {
      name: "Phone number",
      width: "150px",
      selector: "Mobile",
      sortable: true,
      cell: (row) => row?.Mobile,
    },
    {
      name: "Email",
      width: "150px",
      selector: "Email",
      sortable: true,
      cell: (row) => row?.Email,
    },
    {
      name: "Job Applied",
      width: "150px",
      selector: "job_applied",
      sortable: true,
      cell: (row) => row?.job_applied,
    },
    {
      name: "Expected Salary",
      width: "150px",
      selector: "Expected_salary",
      sortable: true,
      cell: (row) => row?.Expected_salary,
    },
    {
      name: "Experince",
      width: "150px",
      selector: "Experince",
      sortable: true,
      cell: (row) => row?.Experince,
    },
    {
      name: "Cv document",
      width: "150px",
      selector: "Cv_document",
      sortable: true,
      cell: (row) => (
        <div className="d-flex flex-wrap ">
          {row?.Cv_document ? (
            <a
              href={row?.Cv_document || ""}
              rel="noopener noreferrer"
              download={false}
              className="me-3"
              target="_blank"
            >
              dowonload file
            </a>
          ) : (
            "NA"
          )}
        </div>
      ),
    },
    {
      name: "City",
      width: "150px",
      selector: "City",
      sortable: true,
      cell: (row) => row.City,
    },
    {
      name: "State",
      width: "150px",
      selector: "State",
      sortable: true,
      cell: (row) => row.State,
    },
    {
      name: "Current Salary",
      width: "100px",
      selector: "Current_salary",
      sortable: true,
      cell: (row) => row.Current_salary,
    },
    {
      name: "Current Company",
      width: "100px",
      selector: "Current_company",
      sortable: true,
      cell: (row) => row.Current_company,
    },
  
    {
      name: "Created At",
      cell: (row) => (
        <div className="text-secondary d-flex justify-content-left align-items-center">
          <span>{moment(row.createdAt).format("dddd, Do MMMM, h:mm a")}</span>
        </div>
      ),
    },
  ];