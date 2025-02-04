// ** React Imports
import { Link } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";
import { MoreVertical, FileText, Edit, Eye } from "react-feather";
import DeleteMenu from "../delete";
export const DeleteFun = (row) => {
  return (
  <div className='d-flex justify-content-start align-items-center'>
     <DeleteMenu row={row} />
  <UncontrolledDropdown>
    <DropdownToggle tag='div' className='btn btn-sm'>
      <MoreVertical size={14} className='cursor-pointer' />
    </DropdownToggle>
    <DropdownMenu right>
      <DropdownItem
        tag={Link}
        to={`/admin/apps/menu/update/${row?._id}`}
        className='w-100'
      >
        <Edit size={14} className='mr-50' />
        <span className='align-middle'>Edit</span>
      </DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
</div>)
}

export const columns = [
  {
    name: "Menu Title",
    selector: "MenuTitle",
    width: "200px",
    // cell: (row) => (
    //     {row?.microMarketTitle || "NA"}
    // ),
  },
  {
    name: "Menu Postion",
    selector: "MenuPostion",
    width: "200px",
    // cell: (row) => (
    //     {row?.microMarketTitle || "NA"}
    // ),
  },
  {
    name: "Menu URL",
    selector: "MenuURL",
    width: "200px",
    // cell: (row) => (
    //     {row?.microMarketTitle || "NA"}
    // ),
  },
  {
    name: "Menu Status",
    selector: "MenuStatus",
    width: "200px",
    cell: (row) => <>{row?.MenuStatus ? "true" : "false"}</>,
  },
  // {
  //   name: "",
  //   cell: (row) => (
  //     <div className="d-flex justify-content-start align-items-center ">
  //       <DeleteMenu row={row} />
  //       <Link
  //         to={`/admin/apps/menu/update/${row?._id}`}
  //         className="mx-3 text-decoration-none"
  //       >
  //         <Edit size={14} className="mr-50" />
  //         <span className="align-middle">Edit</span>
  //       </Link>
  //     </div>
  //   ),
  // },
  {
    name: 'Actions',
    minWidth: '50px',
    width:'50px',
    cell: row => (
      DeleteFun(row)
    )
  }
];
