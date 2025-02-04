// ** React Imports
import { Link } from 'react-router-dom'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { MoreVertical, Edit } from 'react-feather'
import DeleteMedia from '../delete'
export const DeleteFun = (row) => {
  return (
  <div className='d-flex justify-content-start align-items-center'>
  <DeleteMedia row={row} />
  <UncontrolledDropdown>
    <DropdownToggle tag='div' className='btn btn-sm'>
      <MoreVertical size={14} className='cursor-pointer' />
    </DropdownToggle>
    <DropdownMenu right>
      <DropdownItem
        tag={Link}
        to={`/apps/media/update/${row?._id}`}
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
    name: 'link',
    width: '200px',
    selector: 'link',
    sortable: true,
    cell: row => row.link
  },
  {
    name: 'text',
    width: '200px',
    selector: 'text',
    sortable: true,
    cell: row => row.text
  },
  {
    name: 'media',
    width: '200px',
    selector: 'media',
    sortable: true,
    cell: row => (
      <div>
        <img src={row.media} style={{ height: '50px', width: '50px' }}></img>
      </div>
    )
  },
  {
    name: 'Actions',
    minWidth: '50px',
    width:'50px',
    cell: row => (
      DeleteFun(row)
    )
  }
]
