import DeleteBanner from "../delete"
import moment from "moment"
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { MoreVertical, Edit } from 'react-feather'
import { Link } from "react-router-dom"

export const columns = [
  {
    name: 'Name',
    selector: 'banner_name',
    sortable: true,
    cell: row => row.banner_name
  },
  {
    name: 'Banner Image',
    cell: row => (
      <div>
        <img src={row.banner_image} style={{ height: '50px', width: '50px'}}></img>
      </div>
    )
  },
  {
    name: 'Created At',
    cell: row => (
      <div className='text-secondary d-flex justify-content-left align-items-center'>
        <span>{moment(row.createdAt).format("dddd, Do MMMM, h:mm a")}</span>
      </div>
    )
  },
  {
    name: 'Actions',
    cell: row => (
      <div className='d-flex justify-content-start align-items-center'>
        <DeleteBanner row={row} />
        <UncontrolledDropdown>
          <DropdownToggle tag='div' className='btn btn-sm'>
            <MoreVertical size={14} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem
              tag={Link}
              to={`/apps/banner/update/${row?._id}`}
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
