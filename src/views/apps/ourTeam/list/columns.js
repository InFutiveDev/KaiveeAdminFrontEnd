// ** React Imports
import { Link } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { MoreVertical, Edit } from "react-feather";
import DeleteOurTeam from "../delete";
export const DeleteFun = (row) => {
  return (
    <div className="d-flex justify-content-start align-items-center">
      <DeleteOurTeam row={row} />
      <UncontrolledDropdown>
        <DropdownToggle tag="div" className="btn btn-sm">
          <MoreVertical size={14} className="cursor-pointer" />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem
            tag={Link}
            to={`/apps/our-team/update/${row?._id}`}
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
const renderHTML = (htmlString) => {
  return { __html: htmlString };
};
export const columns = [
  {
    name: "doctor name",
    width: "150px",
    selector: "team_name",
    sortable: true,
    cell: (row) => row.team_name,
  },
  {
    name: "doctor image",
    width: "200px",
    selector: "team_image",
    sortable: true,
    cell: (row) => (
      <div>
        <img src={row.team_image} style={{ height: "100px", width: "150px" }} />
      </div>
    ),
  },
  {
    name: "doctor specialisation",
    width: "200px",
    selector: "team_qualification",
    sortable: true,
    cell: (row) => row.team_qualification,
  },
  {
    name: "doctor qualification",
    width: "200px",
    selector: "team_description",
    sortable: true,
    cell: (row) => (
      <div dangerouslySetInnerHTML={renderHTML(row.team_description)} />
    ),
  },
  {
    name: "Actions",
    minWidth: "50px",
    width: "50px",
    cell: (row) => DeleteFun(row),
  },
];
