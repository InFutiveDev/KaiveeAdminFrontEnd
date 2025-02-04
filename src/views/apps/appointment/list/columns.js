import moment from "moment";
export const columns = [
  {
    name: "Nearest branch",
    width: "150px",
    selector: "labData",
    sortable: true,
    cell: (row) => row?.labData,
  },
  {
    name: "Address",
    width: "300px",
    selector: "address",
    sortable: true,
    cell: (row) => `${row?.address}, ${row?.addressPincode}`,
  },
  {
    name: "member Name",
    width: "100px",
    selector: "memberId",
    sortable: true,
    cell: (row) => (row?.memberId ? row?.memberId : row?.username),
  },
  {
    name: "Phone number",
    width: "150px",
    selector: "memberId",
    sortable: true,
    cell: (row) => row?.user_mobile,
  },
  {
    name: "Member Phone Number",
    width: "150px",
    selector: "memberId",
    sortable: true,
    cell: (row) => row?.memberPhone || "",
  },
  {
    name: "Gender",
    width: "150px",
    selector: "memberId",
    sortable: true,
    cell: (row) => row?.memberGender || "",
  },
  {
    name: "Appointment Date",
    width: "200px",
    selector: "appointment_date",
    sortable: true,
    cell: (row) => row?.appointment_date,
  },
  {
    name: "Message",
    width: "200px",
    selector: "message_box",
    sortable: true,
    cell: (row) => row?.message_box,
  },
  {
    name: "time",
    width: "200px",
    selector: "time",
    sortable: true,
    cell: (row) => row?.time,
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
