import { memo, useState, Fragment } from 'react'

// ** Bootsrap components
import { Card, CardHeader, CardBody, FormGroup, Row, Col, Input, Button, Label, Spinner, CustomInput } from 'reactstrap'

// ** Icons from react-feather
import { ArrowLeft } from 'react-feather'
// ** React routings method  or component
import { useHistory } from 'react-router-dom'

// ** redux hools and store 
import { useDispatch } from 'react-redux'

import { CheckObjectValidation } from '../../../../utility/Utils'
import { ADD_HEALTH_RISKS_BY_ADMIN } from '../../../../redux/actions/healthRisk'

// ** Utils funtion to check validation

const AddHealthRisk = () => {
  // ** redux hools and store 
  const dispatch = useDispatch()
  // ** states 
  const history = useHistory()
  const [loading, setLoading] = useState(false)

  const [errorKeyName, setErrorKeyName] = useState('')
  const [payload, setPayload] = useState({
    healthRiskTitle: '',
    healthRisk_image: '',
    description: '',
    healthRisk_image_alt:'',
  })

  const handleFiles = async (e) => {
    const { name, files } = e.target;
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
    delete payload.image_url
    const checkValidation = CheckObjectValidation(payload, [])
    setErrorKeyName(checkValidation.keyname)
    if (checkValidation.isvalid) {
      setLoading(true)
      const res = await dispatch(ADD_HEALTH_RISKS_BY_ADMIN(payload))
      if (res?.success) {
        history.push('/apps/risk/all')
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
            <h4>Add Health Risk</h4>
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
                <Label for='title'>Title <span className='text-danger'><sup><b>*</b></sup></span></Label>
                <Input
                  type='text'
                  name='healthRiskTitle'
                  id='healthRiskTitle'
                  placeholder='Enter Health Risk Title'
                  value={payload?.healthRiskTitle}
                  onChange={hanleInputBase}
                />
                {errorKeyName === 'healthRiskTitle' ? <span className='text-danger'>Risk Title is Required</span> : null}
              </FormGroup>
              <FormGroup>
                <Label for='image'>
                  Health Risk Image
                  <span className='text-danger'><sup><b>*</b></sup></span>
                </Label>
                <Input
                  type='file'
                  name='healthRisk_image'
                  id='healthRisk_image'
                  placeholder='Banner Image'
                  onChange={handleFiles}
                />
                {payload.healthRisk_image ? (
                  <div>
                    <span>Image Preview: </span>
                    <img src={payload?.image_url} style={{ height: '100px', width: '100px' }} />
                  </div>
                ) : null}
                {errorKeyName === 'healthRisk_image' ? <span className='text-danger'>Risk Image is Required</span> : null}
              </FormGroup>
            </Col>
            <FormGroup>
  <Label for="healthRisk_image_alt">
    Health Risk Image Alt Tag
    <span className="text-danger"><sup><b>*</b></sup></span>
  </Label>
  <Input
    type="text"
    name="healthRisk_image_alt"
    id="healthRisk_image_alt"
    placeholder="Enter Image Alt Text"
    value={payload?.healthRisk_image_alt}
    onChange={hanleInputBase}
  />
  {errorKeyName === "healthRisk_image_alt" && (
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
                  placeholder='Enter Health Risk Description'
                  value={payload?.description}
                  onChange={hanleInputBase}
                />
                {errorKeyName === 'description' ? <span className='text-danger'>Risk Description is Required</span> : null}
              </FormGroup>
            </Col>
            <Col sm='12'>
              <FormGroup className='d-flex mb-0'>
                <Button type="submit" disabled={loading} className='mr-1' color='primary' onClick={handleSubmit}>
                  {loading ? <Fragment>
                    <Spinner size='sm' />
                    <span className='ml-50'>Loading...</span>
                  </Fragment> : <span>Add Risk</span>}
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  )
}
export default memo(AddHealthRisk)
