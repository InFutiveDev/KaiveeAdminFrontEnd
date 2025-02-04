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
import DeleteCategory from "../delete";

export const columns = [
  {
    name: "Category Name",
    selector: "category_name",
    // width: '250px',
    sortable: true,
    cell: (row) => (
      <span className="text-capitalize text-secondary">
        {row.category_name}
      </span>
    ),
  },
  {
    name: "Parent Category Name",
    selector: "perent_category_data",
    // width: '250px',
    cell: (row) => (
      <span className="text-capitalize text-secondary">
        {row?.perent_category_name || "N/A"}
      </span>
    ),
  },
  {
    name: "Image",
    selector: "category_image",
    // width:'120px',
    sortable: true,
    cell: (row) => (
      <div>
        {row.category_image ? (
          <img
            src={row.category_image}
            style={{ height: "50px", width: "50px" }}
          />
        ) : (
          "NA"
        )}
      </div>
    ),
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
    name: "Actions",
    // minWidth: '50px',
    // width:'50px',
    cell: (row) => (
      <div className="d-flex justify-content-start align-items-center">
        <DeleteCategory row={row} />
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem
              tag={Link}
              to={`/apps/category/update/${row?._id}`}
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
