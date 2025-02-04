import DeleteInquiry from "../delete";
import moment from "moment";

export const columns = [
  {
    name: "Name",
    width: "120px",
    selector: "patient_name",
    sortable: true,
    cell: (row) => row?.patient_name,
  },
  {
    name: "Email",
    selector: "patient_email",
    width: "200px",
    sortable: true,
    cell: (row) => row?.patient_email,
  },
  {
    name: "Phone",
    selector: "mobile_number",
    width: "120px",
    sortable: true,
    cell: (row) => row?.mobile_number,
  },
  {
    name: "Message",
    width: "300px",
    cell: (row) => <span className="text-capitalize">{row?.message}</span>,
  },
  {
    name: "Source",
    selector: "inquiry_from ",
    width: "200px",
    sortable: true,
    cell: (row) => row?.inquiry_from,
  },
  {
    name: "Url",
    selector: "url",
    width: "200px",
    sortable: true,
    cell: (row) => row?.url,
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
  {
    name: "",
    width: "60px",
    cell: (row) => <DeleteInquiry row={row} />,
  },
];
