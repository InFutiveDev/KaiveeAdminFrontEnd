import moment from "moment";

export const columns = [
  {
    name: "Name",
    width: "120px",
    selector: "your_name",
    sortable: true,
    cell: (row) => row?.your_name,
  },
  {
    name: "Company Name",
    width: "120px",
    selector: "company_name",
    sortable: true,
    cell: (row) => row?.company_name,
  },

  {
    name: "Email",
    selector: "your_email",
    width: "200px",
    sortable: true,
    cell: (row) => row?.your_email,
  },
  {
    name: "Phone",
    selector: "mobile_number",
    width: "120px",
    sortable: true,
    cell: (row) => row?.mobile_number,
  },
  {
    name: "Enquiry",
    width: "300px",
    cell: (row) => (
      <span className="text-capitalize">{row?.select_enquiry}</span>
    ),
  },

  {
    name: "Created At",
    // width: "160px",
    cell: (row) => (
      <div className="text-secondary d-flex justify-content-left align-items-center">
        <span>{moment(row.createdAt).format("dddd, Do MMMM, h:mm a")}</span>
      </div>
    ),
  },
];
