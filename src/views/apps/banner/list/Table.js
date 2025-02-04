// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { GET_ALL_BANNERS } from '../../../../redux/actions/banner'
// **  Components
// import DatePicker from './datePicker'
import { columns } from './columns'
import ReactPaginate from 'react-paginate'
import { ChevronDown, Plus, Edit } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Card, Input, Row, Col, Button } from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useHistory } from 'react-router-dom'

// ** Table Header
const CustomHeader = () => {
  const history = useHistory()

  return (
    <div className='w-100'>
      {/* <Row> */}
        {/* <Col md='7' sm='8'>
          <div>
            <Input
              id='search-user'
              className='w-100'
              placeholder='Search Category'
              value={searchTerm}
              onChange={e => handleSearch(e.target.value)}
            />
          </div>
        </Col> */}
        <div className='d-flex justify-content-end'>
          <Button.Ripple onClick={() => { history.push('/apps/banner/add') }} color='primary'>
            <Plus size={16} className='mr-1' />
            Add
          </Button.Ripple>
        </div>
      {/* </Row> */}
    </div>
  )
}

const InquiryList = () => {
  // ** Store Vars
  const dispatch = useDispatch()

  const store = useSelector(state => state.banner)
  const { banners } = store
  // ** States
  const [currentPage, setCurrentPage] = useState(1)

  // ** Function in get data on page change
  const handlePagination = page => {
    dispatch(GET_ALL_BANNERS(page.selected + 1))
    setCurrentPage(page.selected + 1)
  }

  // ** Function in get data on search query change
  useEffect(() => {
    dispatch(GET_ALL_BANNERS(1))
  }, [])

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(banners?.data?.pagination?.total / 10))

    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={count || 1}
        activeClassName='active'
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end my-2 pr-1'}
      />
    )
  }

  return (
    <Fragment>
      <Card>
        <DataTable
          noHeader
          pagination
          subHeader
          responsive
          noDataComponent={<div>
            <img src='/Nodatacomponent.png' />
          </div>}
          paginationServer
          id='_id'
          columns={columns}
          sortIcon={<ChevronDown />}
          className='react-dataTable'
          paginationComponent={CustomPagination}
          data={banners?.data?.bannerData || []}
          subHeaderComponent={
            <CustomHeader />
          }
        />
      </Card>
    </Fragment>
  )
}

export default InquiryList
