import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { columns } from './columns'
import ReactPaginate from 'react-paginate'
import { ChevronDown, Plus } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Card, Input, Row, Col, Button } from 'reactstrap'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useHistory, useLocation } from 'react-router-dom'
import { getNotifications } from '../../../../redux/actions/notification/notification'

// ** Table Header
const CustomHeader = ({ searchTerm, handleSearch, handleSubmitSearch, user, handleUserChange, category, handleCategoryChange }) => {
  const history = useHistory()
  return (
    <div className='w-100'>
      <Row>
        {/* <Col md='3' sm='6'>
          <div>
            <Input
              id='search-notification'
              className='w-100'
              placeholder='Search Notification'
              value={searchTerm}
              onChange={e => handleSearch(e.target.value)}
            />
          </div>
        </Col> */}
        <Col md='3' sm='5'>
          <div>
            <Input
              id='user-filter'
              className='w-100'
              placeholder='Filter by User'
              value={user}
              onChange={e => handleUserChange(e.target.value)}
            />
          </div>
        </Col>
        <Col md='3' sm='5'>
          <div>
            <Input
              id='category-filter'
              className='w-100'
              placeholder='Filter by Category'
              value={category}
              onChange={e => handleCategoryChange(e.target.value)}
            />
          </div>
        </Col>
        <Col md='2' sm='5'>
          <div className='d-flex justify-content-end'>
            <Button.Ripple color="primary" onClick={handleSubmitSearch}>
              Search
            </Button.Ripple>
          </div>
        </Col>
        <Col md='2' sm='5'>
          <div className='d-flex justify-content-end'>
            <Button.Ripple onClick={() => { history.push('/apps/notification/add') }} color='primary'>
              <Plus size={16} className='mr-1' />
              Add
            </Button.Ripple>
          </div>
        </Col>
      </Row>
    </div>
  )
}

const NotificationTable = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  
  // ** Store Vars
  const { notifications, total, page, limit, totalPages } = useSelector(state => state.notification)
  
  // ** States
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [user, setUser] = useState('')
  const [category, setCategory] = useState('')

  // ** Function to handle pagination
  const handlePagination = page => {
    dispatch(getNotifications(page.selected + 1, searchTerm, user, category))
    setCurrentPage(page.selected + 1)
  }

  // ** Function to handle search
  const handleSearch = val => {
    setSearchTerm(val)
  }

  // ** Function to handle user filter
  const handleUserChange = val => {
    setUser(val)
  }

  // ** Function to handle category filter
  const handleCategoryChange = val => {
    setCategory(val)
  }

  const handleSubmitSearch = () => {
    setCurrentPage(1)
    dispatch(getNotifications(1, searchTerm, user, category))
    // Update URL with search, user and category parameters
    const searchParams = new URLSearchParams(location.search)
    if (searchTerm) {
      searchParams.set('search', searchTerm)
    } else {
      searchParams.delete('search')
    }
    if (user) {
      searchParams.set('user', user)
    } else {
      searchParams.delete('user')
    }
    if (category) {
      searchParams.set('category', category)
    } else {
      searchParams.delete('category')
    }
    history.push(`${location.pathname}?${searchParams.toString()}`)
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={totalPages || 1}
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

  // ** Fetch data on mount and handle URL parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const search = searchParams.get('search')
    const userParam = searchParams.get('user')
    const categoryParam = searchParams.get('category')
    const page = parseInt(searchParams.get('page')) || 1
    
    if (search) {
      setSearchTerm(search)
    }
    if (userParam) {
      setUser(userParam)
    }
    if (categoryParam) {
      setCategory(categoryParam)
    }
    setCurrentPage(page)
    dispatch(getNotifications(page, search || '', userParam || '', categoryParam || ''))
  }, [location.search])

  return (
    <Fragment>
      <Card>
        <DataTable
          noHeader
          pagination
          subHeader
          responsive
          noDataComponent={<div>
            <img src='/Nodatacomponent.png' alt="No Data" />
          </div>}
          paginationServer
          id='_id'
          columns={columns}
          sortIcon={<ChevronDown />}
          className='react-dataTable'
          data={notifications}
          paginationComponent={CustomPagination}
          subHeaderComponent={
            <CustomHeader
              searchTerm={searchTerm}
              handleSearch={handleSearch}
              handleSubmitSearch={handleSubmitSearch}
              user={user}
              handleUserChange={handleUserChange}
              category={category}
              handleCategoryChange={handleCategoryChange}
            />
          }
        />
      </Card>
    </Fragment>
  )
}

export default NotificationTable