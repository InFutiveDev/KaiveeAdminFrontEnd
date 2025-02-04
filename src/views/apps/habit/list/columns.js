// ** React Imports
import { Link } from 'react-router-dom'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { MoreVertical, Edit } from 'react-feather'
import DeleteHabit from '../delete'
export const DeleteFun = (row) => {
  return (
  <div className='d-flex justify-content-start align-items-center'>
  <DeleteHabit row={row} />
  <UncontrolledDropdown>
    <DropdownToggle tag='div' className='btn btn-sm'>
      <MoreVertical size={14} className='cursor-pointer' />
    </DropdownToggle>
    <DropdownMenu right>
      <DropdownItem
        tag={Link}
        to={`/apps/habit/update/${row?._id}`}
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
    name: 'habitName',
    width: '200px',
    selector: 'Habit Name',
    sortable: true,
    cell: row => row.hebitName
  },
  {
    name: 'Description',
    width: '200px',
    selector: 'Description',
    sortable: true,
    cell: row => row.description
  },
  {
    name: 'habit image',
    width: '200px',
    selector: 'habit Image',
    sortable: true,
    cell: row => (
      <div>
        <img src={row.hebit_image} style={{ height: '50px', width: '50px' }}></img>
      </div>
    )
  },
  {
    name: 'image_alt',
    width: '200px',
    selector: 'hebit_image_alt',
    sortable: true,
    cell: row => row.hebit_image_alt
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
