// ** React Imports
import { Link } from 'react-router-dom'

// ** Third Party Components
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { MoreVertical, Edit } from 'react-feather'

import DeleteRisk from '../delete'
import moment from 'moment/moment'

export const columns = [
  {
    name: 'Title',
    width: '200px',
    selector: 'healthRiskTitle',
    sortable: true,
    cell: row => row.healthRiskTitle
  },
  {
    name: 'Image',
    width: '120px',
    cell: row => (
      <div>
        <img src={row.healthRisk_image} style={{ height: '50px', width: '50px' }}></img>
      </div>
    )
  },
  {
    name: 'image_alt',
    width: '200px',
    selector: 'healthRisk_image_alt',
    sortable: true,
    cell: row => row.healthRisk_image_alt
  },
  
  {
    name: 'Description',
    width: '220px',
    cell: row => row.description
  },
  {
    name: 'Actions',
    minWidth: '50px',
    width:'50px',
    cell: row => (
      <div className='d-flex justify-content-start align-items-center'>
        <DeleteRisk row={row} />
        <UncontrolledDropdown>
          <DropdownToggle tag='div' className='btn btn-sm'>
            <MoreVertical size={14} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem
              tag={Link}
              to={`/apps/risk/update/${row?._id}`}
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
