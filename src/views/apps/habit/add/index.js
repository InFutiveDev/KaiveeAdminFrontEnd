import { memo, useState, Fragment } from 'react'
import { Card, CardHeader, CardBody, FormGroup, Row, Col, Input, Button, Label, Spinner,  } from 'reactstrap'

import { ArrowLeft } from 'react-feather'
import { useHistory } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import { CheckObjectValidation } from '../../../../utility/Utils'
import { ADD_HEBIT_ADMIN } from '../../../../redux/actions/habit'


const AddHabit = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [loading, setLoading] = useState(false)

  const [errorKeyName, setErrorKeyName] = useState('')
  const [payload, setPayload] = useState({
    hebitName: '',
    hebit_image: '',
    description: ''
  })

  const handleFiles = async (e) => {
    const { name, files } = e.target
    const imageUrl = URL.createObjectURL(files[0])
    setPayload({ ...payload, [name]: files[0], image_url: imageUrl })
  }

  const hanleInputBase = (e) => {
    const { name, value } = e.target
    if (errorKeyName === name) {
      setErrorKeyName('')
    }
    setPayload({ ...payload, [name]: value })
  }

  const handleSubmit = async () => {
    console.log("payload",payload)
    const checkValidation = CheckObjectValidation(payload, [])
    setErrorKeyName(checkValidation.keyname)
    if (checkValidation.isvalid) {
      setLoading(true)
      const res = await dispatch(ADD_HEBIT_ADMIN(payload))
      if (res?.success) {
        history.push('/apps/habit/all')
        setLoading(false)
      } else {
        setLoading(false)
      }
    }
  }

  return (
    <div>
      <Card>
        <CardHeader className='w-100'>
          <div className='w-100 d-flex align-items-center justify-content-between'>
            <h4>Add Habit</h4>
            <Button.Ripple onClick={() => { history.goBack() }} color='primary' outline>
              <ArrowLeft size={16} className='mr-1' />
              Back
            </Button.Ripple>
          </div>
        </CardHeader>

        <CardBody>
          <Row>
            <Col md='6' sm='12'>
              <FormGroup>
                <Label for='title'>Habit Name <span className='text-danger'><sup><b>*</b></sup></span></Label>
                <Input
                  type='text'
                  name='hebitName'
                  id='hebitName'
                  placeholder='Enter Habit Name'
                  value={payload?.hebitName}
                  onChange={hanleInputBase}
                />
                {errorKeyName === 'hebitName' ? <span className='text-danger'>Habit Name is Required</span> : null}
              </FormGroup>
              <FormGroup>
                <Label for='image'>
                  Health Risk Image
                  <span className='text-danger'><sup><b>*</b></sup></span>
                </Label>
                <Input
                  type='file'
                  name='hebit_image'
                  id='hebit_image'
                  placeholder='Habit Image'
                  onChange={handleFiles}
                />
                {payload.hebit_image ? (
                  <div>
                    <span>Image Preview: </span>
                    <img src={payload?.image_url} style={{ height: '100px', width: '100px' }} />
                  </div>
                ) : null}
                {errorKeyName === 'hebit_image' ? <span className='text-danger'>Habit Image is Required</span> : null}
              </FormGroup>
            </Col>
            <FormGroup>
  <Label for="hebit_image_alt">
    Hebit Image Alt Tag
    <span className="text-danger"><sup><b>*</b></sup></span>
  </Label>
  <Input
    type="text"
    name="hebit_image_alt"
    id="hebit_image_alt"
    placeholder="Enter Image Alt Text"
    value={payload?.healthRisk_image_alt}
    onChange={hanleInputBase}
  />
  {errorKeyName === "hebit_image_alt" && (
    <span className="text-danger">Risk Image Alt is Required</span>
  )}
</FormGroup>
            <Col md='12' sm='12'>
              <FormGroup>
                <Label for='title'>Description <span className='text-danger'><sup><b>*</b></sup></span></Label>
                <Input
                  type='text'
                  name='description'
                  id='description'
                  placeholder='Enter Habit Description'
                  value={payload?.description}
                  onChange={hanleInputBase}
                />
                {errorKeyName === 'description' ? <span className='text-danger'>Habit Description is Required</span> : null}
              </FormGroup>
            </Col>
            <Col sm='12'>
              <FormGroup className='d-flex mb-0'>
                <Button type="submit" disabled={loading} className='mr-1' color='primary' onClick={handleSubmit}>
                  {loading ? <Fragment>
                    <Spinner size='sm' />
                    <span className='ml-50'>Loading...</span>
                  </Fragment> : <span>Add Habit</span>}
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  )
}
export default memo(AddHabit)
