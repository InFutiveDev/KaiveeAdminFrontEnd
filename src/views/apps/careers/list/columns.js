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
            to={`/admin/apps/careers/update/${row?._id}`}
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
    name: "Job Title",
    selector: "job_title",
    width: "200px",
  },
  {
    name: "Placement Type ",
    selector: "job_Type_1",
    width: "100px",
  },
  {
    name: " Opportunity Type",
    selector: "job_Type_2",
    width: "100px",
  },
  {
    name: "Experience",
    selector: "Experience_Requirement",
    width: "150px",
  },
  {
    name: "Openings",
    selector: "Openings",
    width: "100px",
  },
  {
    name: "Contact No",
    selector: "Contact_No",
    width: "150px",
  },
  {
    name: "Address 1",
    selector: "Address_1",
    width: "200px",
  },
  // {
  //   name: "Job Description",
  //   width: "300px",
  //   selector: "Job_Description",
  //   sortable: true,
  //   cell: (row) => (
  //     <div dangerouslySetInnerHTML={renderHTML(row?.Job_Description)} />
  //   ),
  // },

  {
    name: "Job Status",
    selector: "Job_Status",
    width: "100px",
  },
  {
    name: "Job Posted",
    selector: "job_posted",
    width: "200px",
  },
  {
    name: "Actions",
    minWidth: "50px",
    width: "50px",
    cell: (row) => DeleteFun(row),
  },
];
