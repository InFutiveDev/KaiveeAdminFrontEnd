// ** React Imports
import { Link } from "react-router-dom";
import DeleteManage from "../delete";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";
import { MoreVertical, FileText, Edit, Eye } from "react-feather";
export const DeleteFun = (row) => {
  return (
  <div className='d-flex justify-content-start align-items-center'>
       <DeleteManage row={row} />
  <UncontrolledDropdown>
    <DropdownToggle tag='div' className='btn btn-sm'>
      <MoreVertical size={14} className='cursor-pointer' />
    </DropdownToggle>
    <DropdownMenu right>
      <DropdownItem
        tag={Link}
        to={`/admin/apps/admin-management/update/${row?._id}`}
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
    name: "Email",
    selector: "",
    width: "300px",
    sortable: true,
    cell: (row) => (
      <span className="text-secondary">{row?.emailId || "NA"}</span>
    ),
  },
  {
    name: "Name",
    selector: "",
    width: "200px",
    sortable: true,
    cell: (row) => <span className="text-secondary">{row?.name || "NA"}</span>,
  },
  {
    name: "Role type",
    selector: "",
    width: "200px",
    sortable: true,
    cell: (row) => (
      <span className="text-secondary">{row?.role?.RoleTitle || "NA"}</span>
    ),
  },
  {
    name: 'Actions',
    minWidth: '50px',
    width:'50px',
    cell: row => (
      DeleteFun(row)
    )
  },

  // {
  //   name: "",
  //   cell: (row) => (
  //     <div className="d-flex justify-content-start align-items-center ">
  //       <DeleteManage row={row} />
  //       <Link
  //         to={`/admin/apps/admin-management/update/${row?._id}`}
  //         className="mx-3 text-decoration-none"
  //       >
  //         <Edit size={14} className="mr-50" />
  //         <span className="align-middle">Edit</span>
  //       </Link>
  //     </div>
  //   ),
  // },
  // {
  //   name: '',
  //   cell: row => (
  //     <div className='d-flex justify-content-start align-items-center '>
  //       <DeleteUser row={row} />
  //       <UncontrolledDropdown>
  //         <DropdownToggle tag='div' className='btn btn-sm'>
  //           <MoreVertical size={14} className='cursor-pointer' />
  //         </DropdownToggle>
  //         <DropdownMenu right>
  //           <DropdownItem
  //             tag={Link}
  //             to={`/admin/apps/user/update/${row?._id}`}
  //             className='w-100'
  //           >
  //             <Edit size={14} className='mr-50' />
  //             <span className='align-middle'>Edit</span>
  //           </DropdownItem>
  //           <DropdownItem
  //             tag={Link}
  //             to={`/admin/apps/user/${row?._id}/wallet/transactions`}
  //             className='w-100'
  //           >
  //             <Eye size={14} className='mr-50' />
  //             <span className='align-middle'>View Transactions</span>
  //           </DropdownItem>
  //         </DropdownMenu>
  //       </UncontrolledDropdown>
  //     </div>
  //   )
  // }
];
