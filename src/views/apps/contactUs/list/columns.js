import moment from "moment";
export const columns = [  
      {
        name: "First Name",
        width: "170px",
        selector: "first_name",
        sortable: true,
        cell: (row) => row.first_name,
      },
      {
        name: "Last Name",
        width: "150px",
        selector: "last_name",
        sortable: true,
        cell: (row) => row.last_name,
      },
    
      {
        name: "Email",
        width: "200px",
        selector: "emailId",
        sortable: true,
        cell: (row) => row.emailId,
      },
      {
        name: "Mobile",
        width: "150px",
        selector: "mobile",
        sortable: true,
        cell: (row) => row.mobile,
      },
      {
        name: "Message",
        width: "150px",
        selector: "message",
        sortable: true,
        cell: (row) => row.message,
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