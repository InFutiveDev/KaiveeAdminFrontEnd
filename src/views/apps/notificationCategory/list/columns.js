import { Link } from 'react-router-dom'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { MoreVertical, Edit } from 'react-feather'
import DeleteCategory from '../delete'

export const columns = [
  {
    name: 'Name',
    selector: 'name',
    sortable: true,
    cell: row => row.name.charAt(0).toUpperCase() + row.name.slice(1)
  },
  {
    name: 'Description',
    selector: 'description',
    sortable: true,
    cell: row => row.description
  },
  {
    name: 'Default',
    selector: 'isDefault',
    sortable: true,
    cell: row => row.isDefault ? 'Yes' : 'No'
  },
  {
    name: 'Actions',
    cell: row => (
      <div className='d-flex justify-content-start align-items-center'>
        <DeleteCategory row={row} />
        <UncontrolledDropdown>
          <DropdownToggle tag='div' className='btn btn-sm'>
            <MoreVertical size={14} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem
              tag={Link}
              to={`/apps/notificationCategory/edit/${row?._id}`}
              className='w-100'
            >
              <Edit size={14} className='mr-50' />
              <span className='align-middle'>Edit</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
] 