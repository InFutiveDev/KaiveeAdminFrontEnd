// ** React Imports
import { Link } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { MoreVertical, Edit } from "react-feather";
import DeleteBioWaste from "../delete";
export const DeleteFun = (row) => {
  return (
    <div className="d-flex justify-content-start align-items-center">
      <DeleteBioWaste row={row} />
      <UncontrolledDropdown>
        <DropdownToggle tag="div" className="btn btn-sm">
          <MoreVertical size={14} className="cursor-pointer" />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem
            tag={Link}
            to={`/apps/bio-waste/update/${row?._id}`}
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
    name: "Centre Name",
    width: "100px",
    selector: "centre_name",
    sortable: true,
    cell: (row) => row.centre_name,
  },
  {
    name: "Red Bag",
    width: "100px",
    selector: "red_bag",
    sortable: true,
    cell: (row) => row.red_bag,
  },
  {
    name: "Yellow Bag",
    width: "100px",
    selector: "yellow_bag",
    sortable: true,
    cell: (row) => row.yellow_bag,
  },
  {
    name: "Sharp Box",
    width: "100px",
    selector: "sharp_box",
    sortable: true,
    cell: (row) => row.sharp_box,
  },
  {
    name: "blue card Board Box",
    width: "200px",
    selector: "blue_card_board_box",
    sortable: true,
    cell: (row) => row.blue_card_board_box,
  },
  {
    name: "Months",
    width: "100px",
    selector: "months",
    sortable: true,
    cell: (row) => row.months,
  },
  {
    name: "Year",
    width: "100px",
    selector: "year",
    sortable: true,
    cell: (row) => row.year,
  },
  {
    name: "Actions",
    minWidth: "50px",
    width: "50px",
    cell: (row) => DeleteFun(row),
  },
];
