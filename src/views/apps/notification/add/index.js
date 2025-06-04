import { memo, useState, Fragment, useEffect } from 'react'
import { Card, CardHeader, CardBody, FormGroup, Row, Col, Input, Button, Label, Spinner } from 'reactstrap'
import { ArrowLeft } from 'react-feather'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CheckObjectValidation } from '../../../../utility/Utils'
import { createNotification } from '../../../../redux/actions/notification/notification'
import { GET_ALL_USERS } from '../../../../redux/actions/users'
import { getNotificationCategories } from '../../../../redux/actions/notification/category'

const AddNotification = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [errorKeyName, setErrorKeyName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [userSearchTerm, setUserSearchTerm] = useState('')
  const [showUserResults, setShowUserResults] = useState(false)
  const { users } = useSelector(state => state.users)
  const { categories: notificationCategories = [] } = useSelector(state => state.notificationCategory)
  const [payload, setPayload] = useState({
    user: '',
    title: '',
    message: '',
    category: '',
    isRead: false,
    isArchived: false
  })

  useEffect(() => {
    dispatch(getNotificationCategories())
  }, [])

  useEffect(() => {
    if (userSearchTerm) {
      const debounceTimer = setTimeout(() => {
        dispatch(GET_ALL_USERS(1, userSearchTerm))
      }, 500)
      return () => clearTimeout(debounceTimer)
    }
  }, [userSearchTerm])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    if (errorKeyName === name) setErrorKeyName('')
    setPayload({
      ...payload,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleUserSelect = (user) => {
    setPayload({
      ...payload,
      user: user._id
    })
    setUserSearchTerm(user.name)
    setShowUserResults(false)
  }

  const handleSubmit = async () => {
    setErrorMessage('')
    const checkValidation = CheckObjectValidation(payload, ['user', 'title', 'message', 'category'])
    setErrorKeyName(checkValidation.keyname)
    if (checkValidation.isvalid) {
      setLoading(true)
      const res = await dispatch(createNotification(payload))
      if (res?.success) {
        history.push('/apps/notification/all')
      } else {
        setErrorMessage(res?.msg || 'Failed to create notification')
      }
      setLoading(false)
    }
  }

  return (
    <div>
      <Card>
        <CardHeader className='w-100'>
          <div className='w-100 d-flex align-items-center justify-content-between'>
            <h4>Add Notification</h4>
            <Button.Ripple onClick={() => { history.goBack() }} color='primary' outline>
              <ArrowLeft size={16} className='mr-1' />
              Back
            </Button.Ripple>
          </div>
        </CardHeader>
        <CardBody>
          {errorMessage && (
            <div className="alert alert-danger mb-2">
              {errorMessage}
            </div>
          )}
          <Row>
            <Col md='6' sm='12'>
              <FormGroup>
                <Label>User <span className='text-danger'><sup>*</sup></span></Label>
                <div className="position-relative">
                  <Input
                    type='text'
                    placeholder='Search User'
                    value={userSearchTerm}
                    onChange={(e) => {
                      setUserSearchTerm(e.target.value)
                      setShowUserResults(true)
                    }}
                    onFocus={() => setShowUserResults(true)}
                  />
                  {showUserResults && users?.data?.userData?.length > 0 && (
                    <div className="position-absolute w-100 bg-white border rounded-bottom" style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}>
                      {users.data.userData.map(user => (
                        <div
                          key={user._id}
                          className="p-1 cursor-pointer hover-bg-light"
                          onClick={() => handleUserSelect(user)}
                          style={{ cursor: 'pointer' }}
                        >
                          {user.name} ({user.emailId})
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {errorKeyName === 'user' && <span className='text-danger'>User is required</span>}
              </FormGroup>
              <FormGroup>
                <Label>Title <span className='text-danger'><sup>*</sup></span></Label>
                <Input
                  type='text'
                  name='title'
                  placeholder='Enter Title'
                  value={payload.title}
                  maxLength={100}
                  onChange={handleInputChange}
                />
                {errorKeyName === 'title' && <span className='text-danger'>Title is required</span>}
              </FormGroup>
              <FormGroup>
                <Label>Message <span className='text-danger'><sup>*</sup></span></Label>
                <Input
                  type='textarea'
                  name='message'
                  placeholder='Enter Message'
                  value={payload.message}
                  maxLength={1000}
                  onChange={handleInputChange}
                />
                {errorKeyName === 'message' && <span className='text-danger'>Message is required</span>}
              </FormGroup>
              <FormGroup>
                <Label>Category <span className='text-danger'><sup>*</sup></span></Label>
                <Input
                  type='select'
                  name='category'
                  value={payload.category}
                  onChange={handleInputChange}
                >
                  <option value=''>Select Category</option>
                  {notificationCategories?.map(category => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </Input>
                {errorKeyName === 'category' && <span className='text-danger'>Category is required</span>}
              </FormGroup>
            </Col>
            <Col md='6' sm='12'>
              <FormGroup check>
                <Label check>
                  <Input
                    type='checkbox'
                    name='isRead'
                    checked={payload.isRead}
                    onChange={handleInputChange}
                  />{' '}
                  Is Read
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type='checkbox'
                    name='isArchived'
                    checked={payload.isArchived}
                    onChange={handleInputChange}
                  />{' '}
                  Is Archived
                </Label>
              </FormGroup>
            </Col>
            <Col sm='12'>
              <FormGroup className='d-flex mb-0'>
                <Button type="submit" disabled={loading} className='mr-1' color='primary' onClick={handleSubmit}>
                  {loading ? (
                    <Fragment>
                      <Spinner size='sm' />
                      <span className='ml-50'>Loading...</span>
                    </Fragment>
                  ) : (
                    <span>Add Notification</span>
                  )}
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  )
}

export default memo(AddNotification)