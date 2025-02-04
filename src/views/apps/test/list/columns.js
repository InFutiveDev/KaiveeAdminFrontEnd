// ** React Imports
import { Link } from "react-router-dom";

// ** Third Party Components
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { MoreVertical, Edit } from "react-feather";
import DeleteTest from "../delete";
import ControlFeature from "./controlfeature";

export const columns = (handleStatusChange) => {
  return [
    {
      name: "Speciality Name",
      selector: "specialityName",
      width: "200px",
      sortable: true,
      cell: (row) => row.specialityName,
    },
    {
      name: "Test Name",
      selector: "test_name",
      width: "150px",
      sortable: true,
      cell: (row) => row.test_name,
    },
    {
      name: "Report Time",
      selector: "report",
      width: "120px",
      sortable: true,
      cell: (row) => row.report,
    },
    {
      name: "Test MRP",
      width: "120px",
      selector: "mrp",
      sortable: true,
      cell: (row) => <span>{row?.mrp}</span>,
    },
    {
      name: "Feature",
      width: "120px",
      selector: "mrp",
      sortable: true,
      cell: (row) => <ControlFeature row={row} />,
    },
    {
      name: "Mange Faqs",
      width: "150px",
      // selector: 'mrp',
      sortable: true,
      cell: (row) => (
        <Link to={`/apps/manage/faqs?itemId=${row?._id}`}>Manage Faqs</Link>
      ),
    },
    {
      selector: (row) => {
        return (
          <span
            className={`${!row.test_status ? "un_paid" : "is_paid"}`}
            onClick={() => handleStatusChange(row)}
          >
            {row.test_status ? "Active" : "Deactive"}
          </span>
        );
      },
      width: "100px",
      name: "Status",
    },
    {
      name: "Actions",
      minWidth: "50px",
      width: "50px",
      cell: (row) => (
        <div className="d-flex justify-content-start align-items-center">
          <DeleteTest row={row} />
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem
                tag={Link}
                to={`/apps/test/update/${row?._id}`}
                className="w-100"
              >
                <Edit size={14} className="mr-50" />
                <span className="align-middle">Edit</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      ),
    },
  ];
};
