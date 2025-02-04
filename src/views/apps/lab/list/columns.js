// ** React Imports
import { Link } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { MoreVertical, Edit } from "react-feather";
import DeleteMenu from "../delete";

export const DeleteFun = (row) => {
  return (
    <div className="d-flex justify-content-start align-items-center">
      <DeleteMenu row={row} />
      <UncontrolledDropdown>
        <DropdownToggle tag="div" className="btn btn-sm">
          <MoreVertical size={14} className="cursor-pointer" />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem
            tag={Link}
            to={`/admin/apps/lab/update/${row?._id}`}
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

export const columns = [
  {
    name: "Branch Name",
    selector: "branch_Name",
    width: "200px",
  },
  {
    name: "Branch Address",
    selector: "branch_address",
    width: "200px",
  },
  {
    name: "Branch Location",
    selector: "branch_location",
    width: "200px",
  },

  {
    name: "Actions",
    minWidth: "50px",
    width: "50px",
    cell: (row) => DeleteFun(row),
  },
];
