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

import DeleteCoupon from "../delete";
import moment from "moment/moment";

export const columns = [
  {
    name: "Coupon Code",
    width: "150px",
    cell: (row) => row.coupon_code,
  },
  {
    name: "Discount",
    selector: "discount",
    width: "120px",
    sortable: true,
    cell: (row) => row.discount,
  },
  {
    name: "Discount Type",
    selector: "discount_type",
    width: "120px",
    sortable: true,
    cell: (row) => row.discount_type,
  },
  {
    name: "Max Value",
    width: "120px",
    selector: "max_value",
    sortable: true,
    cell: (row) => row.max_value,
  },
  {
    name: "Minimum Value",
    width: "120px",
    selector: "max_value",
    sortable: true,
    cell: (row) => row.minimum_amount,
  },
  {
    name: "Used Type",
    width: "120px",
    cell: (row) => row?.used_type,
  },
  {
    name: "Valid Till",
    width: "200px",
    cell: (row) => (
      <div className="text-secondary d-flex justify-content-left align-items-center">
        <span>{moment(row.validity).format("dddd, Do MMMM, h:mm a")}</span>
      </div>
    ),
  },
  {
    name: "Actions",
    minWidth: "50px",
    width: "50px",
    cell: (row) => (
      <div className="d-flex justify-content-start align-items-center">
        <DeleteCoupon row={row} />
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem
              tag={Link}
              to={`/apps/coupon/update/${row?._id}`}
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
