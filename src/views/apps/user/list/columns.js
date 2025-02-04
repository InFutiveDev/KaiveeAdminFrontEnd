import UserImage from "../../../../assets/images/avatars/avatar-blank.png";
export const columns = [
  // {
  //   name: 'Username',
  //   selector: 'userName',
  //   sortable: true,
  //   cell: row => row.userName
  // },
  {
    name: "Name",
    selector: "name",
    width: "180px",
    sortable: true,
    cell: (row) => row.name,
  },
  {
    name: "Profile image",
    width: "200px",
    selector: "profilePicture",
    sortable: true,
    cell: (row) => (
      <div>
        <img
          src={row?.profilePicture || UserImage}
          style={{ height: "100px", width: "150px" }}
        />
      </div>
    ),
  },
  {
    name: "Email",
    selector: "",
    width: "260px",
    sortable: true,
    cell: (row) => row.emailId,
  },
  {
    name: "Phone",
    width: "120px",
    selector: "",
    sortable: true,
    cell: (row) => row.mobile,
  },
  // {
  //   name: 'Company',
  //   cell: row => (
  //     <span className="text-capitalize">
  //       {row?.company}
  //     </span>
  //   )
  // },
  {
    name: "Type",
    cell: (row) => <span className="text-capitalize">{row?.type}</span>,
  },
  // {
  //   name: '',
  //   width: '60px',
  //   cell: row => (
  //     <DeleteUser row={row} />
  //   )
  // },
  // {
  //   name: '',
  //   minWidth: '50px',
  //   width:'50px',
  //   cell: row => (
  //     <UncontrolledDropdown>
  //       <DropdownToggle tag='div' className='btn btn-sm'>
  //         <MoreVertical size={14} className='cursor-pointer' />
  //       </DropdownToggle>
  //       <DropdownMenu right>
  //         <DropdownItem
  //           tag={Link}
  //           to={`/apps/user/update/${row?._id}`}
  //           className='w-100'
  //         >
  //           <Edit size={14} className='mr-50' />
  //           <span className='align-middle'>Edit</span>
  //         </DropdownItem>
  //         <DropdownItem
  //           tag={Link}
  //           to={`/apps/user/${row?._id}/wallet/transactions`}
  //           className='w-100'
  //         >
  //           <Eye size={14} className='mr-50' />
  //           <span className='align-middle'>View Transactions</span>
  //         </DropdownItem>
  //       </DropdownMenu>
  //     </UncontrolledDropdown>
  //   )
  // }
];
