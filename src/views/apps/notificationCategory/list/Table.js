import { memo } from 'react'
import DataTable from 'react-data-table-component'
import { columns } from './columns'

const Table = ({ data }) => {
  return (
    <DataTable
      data={data}
      columns={columns}
      noHeader
      pagination
      className='react-dataTable'
      paginationRowsPerPageOptions={[10, 25, 50, 100]}
    />
  )
}

export default memo(Table)
