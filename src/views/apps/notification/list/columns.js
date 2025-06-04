import { Link } from 'react-router-dom'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { MoreVertical, Edit } from 'react-feather'
import DeleteNotification from '../delete'

export const DeleteFun = (row) => {
  return (
    <div className='d-flex justify-content-start align-items-center'>
      <DeleteNotification row={row} />
      {/* <UncontrolledDropdown>
        <DropdownToggle tag='div' className='btn btn-sm'>
          <MoreVertical size={14} className='cursor-pointer' />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem
            tag={Link}
            to={`/apps/notification/update/${row?._id}`}
            className='w-100'
          >
            <Edit size={14} className='mr-50' />
            <span className='align-middle'>Edit</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown> */}
    </div>
  )
}

export const columns = [
  {
    name: 'Title',
    width: '200px',
    selector: 'title',
    sortable: true,
    cell: row => row.title
  },
  {
    name: 'Message',
    width: '250px',
    selector: 'message',
    sortable: true,
    cell: row => row.message
  },
  {
    name: 'Category',
    width: '150px',
    selector: 'category',
    sortable: true,
    cell: row => typeof row.category === 'object' ? row.category?.name : row.category
  },
  {
    name: 'User',
    width: '150px',
    selector: 'user',
    sortable: true,
    cell: row => typeof row.user === 'object' ? row.user?.name || row.user?.email : row.user
  },
  {
    name: 'Is Read',
    width: '100px',
    selector: 'isRead',
    sortable: true,
    cell: row => row.isRead ? 'Yes' : 'No'
  },
  {
    name: 'Is Archived',
    width: '120px',
    selector: 'isArchived',
    sortable: true,
    cell: row => row.isArchived ? 'Yes' : 'No'
  },
  // {
  //   name: 'Link',
  //   width: '200px',
  //   selector: 'link',
  //   sortable: true,
  //   cell: row => row.link
  // },
  {
    name: 'Actions',
    minWidth: '50px',
    width: '50px',
    cell: row => DeleteFun(row)
  }
]