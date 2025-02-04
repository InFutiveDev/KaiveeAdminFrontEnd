// ** React Imports
import { Link } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";
import { MoreVertical, Edit } from "react-feather";
import moment from "moment";
// import DeleteMenu from "../delete";
export const DeleteFun = (row) => {
  return (
    <div className="d-flex justify-content-start align-items-center">
      {/* <DeleteMenu row={row} /> */}
      <UncontrolledDropdown>
        <DropdownToggle tag="div" className="btn btn-sm">
          <MoreVertical size={14} className="cursor-pointer" />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem
            tag={Link}
            to={`/admin/apps/order/update/${row?._id}`}
            className="w-100"
          >
            <Edit size={14} className="mr-50" />
            <span className="align-middle">Edit</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};

export const columns = (handleStatusChange) => {
  return [
    {
      name: "S.No",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "50px",
    },
    {
      name: "Order Id",
      selector: "id",
      sortable: true,
      width: "100px",
    },
    {
      name: "Booking details",
      width: "300px",
      selector: (row) => {
        return row.testId.map((item, index) => (
          <div className="text-capitalize">
            <p className="mb-0">
              test name {`${index + 1}`}: {item?.test_name || "N/A"}
            </p>
          </div>
        ));
      },
      sortable: true,
    },
    {
      name: "Booked By",
      width: "200px",
      selector: (row) => {
        return (
          <div className="text-capitalize">
            <p className="mb-0">Full name: {row?.userName || "N/A"}</p>
            <p className="mb-0">Email: {row?.userEmail || "N/A"}</p>
            <p className="mb-0">Mobile: {row?.userMobile || "N/A"}</p>
          </div>
        );
      },
    },
    {
      name: "Member",
      width: "200px",
      selector: (row) => {
        return (
          <div className="text-capitalize">
            <p className="mb-0">
              Full Name: {row?.memberData?.fullName || "N/A"}
            </p>
            <p className="mb-0">Gender: {row?.memberData?.gender || "N/A"}</p>
            <p className="mb-0">Phone: {row?.memberData?.phone || "N/A"}</p>
            <p className="mb-0">
              Relation: {row?.memberData?.relation || "N/A"}
            </p>
          </div>
        );
      },
    },
    {
      name: "User Mobile",
      selector: "userMobile",
      // width: "130px",
    },
    {
      selector: (row) => {
        if (row?.addressData) {
          return (
            <div>
              <p className="m-0">{row?.addressData?.address1}</p>
              <p className="m-0">{row?.addressData?.city}</p>
            </div>
          );
        } else {
          return "No Address mention";
        }
      },
      name: "User Address",
    },
    {
      selector: "createdAt",
      name: "Order Date",
      width: "200px",
      selector: (row) => {
        return (
          <div className="text-capitalize">
            {moment(row.createdAt).format("D/MM/YY, h:mm:ss a")}
          </div>
        );
      },
    },
    {
      selector: "paymentAmount",
      name: "Amount",
      selector: (row) => {
        return (
          <div className="text-capitalize">Rs. {row?.paymentAmount}/-</div>
        );
      },
    },
    {
      selector: "Collection Date Time",
      name: "Collection Date Time",
      width: "200px",
      selector: (row) => {
        return row?.sampleCollectionDateTime ? (
          <div className="text-capitalize">
            {row?.sampleCollectionDateTime.split(",")[0]}
          </div>
        ) : (
          ""
        );
      },
    },
    {
      selector: "time slot",
      width: "200px",
      name: "time slot",
      selector: (row) => {
        return <div className="text-capitalize">{row?.timeslot}</div>;
      },
    },
    {
      selector: (row) => {
        return (
          <span className={`${!row.is_paid ? "un_paid" : "is_paid"}`}>
            {row.is_paid ? "Paid" : "UnPaid"}
          </span>
        );
      },
      name: "Is Paid",
    }, 
  ];
};
