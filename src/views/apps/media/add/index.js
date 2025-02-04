import { memo, useState, Fragment } from 'react'
import { Card, CardHeader, CardBody, FormGroup, Row, Col, Input, Button, Label, Spinner,  } from 'reactstrap'

import { ArrowLeft } from 'react-feather'
import { useHistory } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import { CheckObjectValidation } from '../../../../utility/Utils'
import { ADD_MEDIA_ADMIN } from '../../../../redux/actions/media'


const AddMedia = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [loading, setLoading] = useState(false)

  const [errorKeyName, setErrorKeyName] = useState('')
  const [payload, setPayload] = useState({
    link: '',
    media: '',
    text: ''
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
      const res = await dispatch(ADD_MEDIA_ADMIN(payload))
      if (res?.success) {
        history.push('/apps/media/all')
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
            <h4>Add Media</h4>
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
                <Label for='title'>Media Link <span className='text-danger'><sup><b>*</b></sup></span></Label>
                <Input
                  type='text'
                  name='link'
                  id='link'
                  placeholder='Enter Link'
                  value={payload?.link}
                  onChange={hanleInputBase}
                />
                {errorKeyName === 'link' ? <span className='text-danger'>Link is Required</span> : null}
              </FormGroup>
              <FormGroup>
                <Label for='image'>
                  Image
                  <span className='text-danger'><sup><b>*</b></sup></span>
                </Label>
                <Input
                  type='file'
                  name='media'
                  id='media'
                  placeholder='Image'
                  onChange={handleFiles}
                />
                {payload.media ? (
                  <div>
                    <span>Image Preview: </span>
                    <img src={payload?.image_url} style={{ height: '100px', width: '100px' }} />
                  </div>
                ) : null}
                {errorKeyName === 'media' ? <span className='text-danger'>Habit Image is Required</span> : null}
              </FormGroup>
            </Col>
            <Col md='12' sm='12'>
              <FormGroup>
                <Label for='title'>Text <span className='text-danger'><sup><b>*</b></sup></span></Label>
                <Input
                  type='text'
                  name='text'
                  id='text'
                  placeholder='Enter text'
                  value={payload?.text}
                  onChange={hanleInputBase}
                />
                {errorKeyName === 'text' ? <span className='text-danger'>Text is Required</span> : null}
              </FormGroup>
            </Col>
            <Col sm='12'>
              <FormGroup className='d-flex mb-0'>
                <Button type="submit" disabled={loading} className='mr-1' color='primary' onClick={handleSubmit}>
                  {loading ? <Fragment>
                    <Spinner size='sm' />
                    <span className='ml-50'>Loading...</span>
                  </Fragment> : <span>Add Media</span>}
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  )
}
export default memo(AddMedia)
