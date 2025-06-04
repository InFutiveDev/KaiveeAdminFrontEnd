import { memo, useState, Fragment } from 'react'
import { Card, CardHeader, CardBody, FormGroup, Row, Col, Input, Button, Label, Spinner } from 'reactstrap'
import { ArrowLeft } from 'react-feather'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { CheckObjectValidation } from '../../../../utility/Utils'
import { createNotificationCategory } from '../../../../redux/actions/notification/category'

const AddNotificationCategory = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [errorKeyName, setErrorKeyName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [payload, setPayload] = useState({
    name: '',
    description: '',
    isDefault: false
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    if (errorKeyName === name) setErrorKeyName('')
    setPayload({
      ...payload,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleSubmit = async () => {
    setErrorMessage('')
    const checkValidation = CheckObjectValidation(payload, ['name', 'description'])
    setErrorKeyName(checkValidation.keyname)
    if (checkValidation.isvalid) {
      setLoading(true)
      const res = await dispatch(createNotificationCategory(payload))
      if (res?.success) {
        history.push('/apps/notificationCategory/list')
      } else {
        setErrorMessage(res?.msg || 'Failed to create category')
      }
      setLoading(false)
    }
  }

  return (
    <div>
      <Card>
        <CardHeader className='w-100'>
          <div className='w-100 d-flex align-items-center justify-content-between'>
            <h4>Add Notification Category</h4>
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
                <Label>Name <span className='text-danger'><sup>*</sup></span></Label>
                <Input
                  type='text'
                  name='name'
                  placeholder='Enter Category Name'
                  value={payload.name}
                  onChange={handleInputChange}
                />
                {errorKeyName === 'name' && <span className='text-danger'>Name is required</span>}
              </FormGroup>
              <FormGroup>
                <Label>Description <span className='text-danger'><sup>*</sup></span></Label>
                <Input
                  type='textarea'
                  name='description'
                  placeholder='Enter Description'
                  value={payload.description}
                  onChange={handleInputChange}
                />
                {errorKeyName === 'description' && <span className='text-danger'>Description is required</span>}
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type='checkbox'
                    name='isDefault'
                    checked={payload.isDefault}
                    onChange={handleInputChange}
                  />{' '}
                  Is Default
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
                    <span>Create Category</span>
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

export default memo(AddNotificationCategory) 