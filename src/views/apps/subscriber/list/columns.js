import moment from "moment";
export const columns = [
    {
      name: "Subsriber Email",
      width: "300px",
      selector: "subsriber_email",
      sortable: true,
      cell: (row) => row.subsriber_email,
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