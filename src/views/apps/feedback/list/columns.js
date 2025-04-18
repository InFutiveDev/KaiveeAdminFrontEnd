import DeleteInquiry from "../delete";
import moment from "moment";

export const columns = [
  {
    name: "First Name",
    width: "120px",
    selector: "first_name",
    sortable: true,
    cell: (row) => row?.first_name,
  },
  {
    name: "Last Name",
    width: "120px",
    selector: "last_name",
    sortable: true,
    cell: (row) => row?.last_name,
  },
  {
    name: "Email",
    selector: "email_id",
    width: "200px",
    sortable: true,
    cell: (row) => row?.email_id,
  },
  {
    name: "Phone",
    selector: "mobile_number",
    width: "120px",
    sortable: true,
    cell: (row) => row?.mobile_number,
  },
  {
    name: "Rating",
    selector: "rating",
    width: "120px",
    sortable: true,
    cell: (row) => row?.rating,
  },
  {
    name: "Message",
    width: "300px",
    cell: (row) => <span className="text-capitalize">{row?.message}</span>,
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
