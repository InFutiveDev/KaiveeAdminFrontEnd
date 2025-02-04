import { useState, Fragment, useEffect } from 'react'

import { Card, CardHeader, CardBody, Row, Col, Input, Button, Label, Spinner, FormGroup, Text } from "reactstrap"
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_SETTING_BY_ADMIN, GET_SETTING } from '../../../redux/actions/setting'
import SpinnerComponent from '../../../@core/components/spinner/Fallback-spinner'
const Setting = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const store = useSelector(state => state.setting)
  const { settingInfo } = store
  const [payload, setPayload] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setPayload({ ...payload, [name]: value })
  }

  const handleSubmit = async () => {
    setLoading(true)

    const res = await dispatch(UPDATE_SETTING_BY_ADMIN(payload))
    if (res?.success) {
      setLoading(false)
    } else {
      setLoading(false)
    }
  }

  useEffect(() => {
    dispatch(GET_SETTING())
  }, [])

  useEffect(() => {
    if (settingInfo?.data && settingInfo?.data.length) {
      setPayload(settingInfo.data[0])
    }
  }, [settingInfo?.data])

  return (
    <div>
      {!payload ? (
        <SpinnerComponent />
      ) :
        <Card>
          <CardHeader className='w-100'>
            <div className='w-100 d-flex align-items-center justify-content-between'>
              <h4>Setting Management</h4>
            </div>
          </CardHeader>
          <CardBody>
            <Row>
              <Col md='6' sm='12'>
                <FormGroup>
                  <Label> Contact Email</Label>
                  <Input
                    type="text"
                    name="contact_email"
                    id="contact_email"
                    value={payload?.contact_email}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md='6' sm='12'>
                <FormGroup>
                  <Label> Contact Number</Label>
                  <Input
                    type="text"
                    name="contact_phone"
                    id="contact_phone"
                    value={payload.contact_phone}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <div className="clearfix" />
              <Col md='6' sm='12'>
                <FormGroup>
                  <Label>Twitter</Label>
                  <Input
                    type="text"
                    name="social_twitter"
                    id="social_twitter"
                    value={payload.social_twitter}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md='6' sm='12'>
                <FormGroup>
                  <Label> Facebook:</Label>
                  <Input
                    type="text"
                    name="social_facebook"
                    id="social_facebook"
                    value={payload.social_facebook}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md='6' sm='12'>
                <FormGroup>
                  <Label> Google:</Label>
                  <Input
                    type="text"
                    name="social_google"
                    id="social_google"
                    value={payload.social_google}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md='6' sm='12'>
                <FormGroup>
                  <Label> Instagram:</Label>
                  <Input
                    type="text"
                    name="social_instagram"
                    id="social_instagram"
                    value={payload.social_instagram}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md='6' sm='12'>
                <FormGroup>
                  <Label> linkedin:</Label>
                  <Input
                    type="text"
                    name="social_linkedin"
                    id="social_linkedin"
                    value={payload.social_linkedin}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md='6' sm='12'>
                <FormGroup>
                  <Label> YouTube:</Label>
                  <Input
                    type="text"
                    name="social_youtube"
                    id="social_youtube"
                    value={payload.social_youtube}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md='6' sm='12'>
                <FormGroup>
                  <Label> Whatsapp API:</Label>
                  <Input
                    type="text"
                    name="whatsapp_api"
                    id="whatsapp_api"
                    value={payload.whatsapp_api}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md='6' sm='12'>
                <FormGroup>
                  <Label> Whatsapp Number:</Label>
                  <Input
                    type="text"
                    name="whatsapp_api_number"
                    id="whatsapp_api_number"
                    value={payload.whatsapp_api_number}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md='6' sm='12'>
                <FormGroup>
                  <Label> Address</Label>
                  <textarea
                    name="contact_address"
                    id="contact_address"
                    rows={8}
                    className="form-control"
                    value={payload.contact_address}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md='6' sm='12'>
                <FormGroup>
                  <Label> Live Chat Code:</Label>
                  <textarea
                    name="live_chat"
                    id="live_chat"
                    rows={8}
                    className="form-control"
                    value={payload.live_chat}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md='6' sm='12'>
                <FormGroup>
                  <Label> Google Analytic Code:</Label>
                  <textarea
                    name="ga_code"
                    id="ga_code"
                    rows={8}
                    className="form-control"
                    value={payload.ga_code}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <div className="clearfix" />
              <Col sm='12'>
                <FormGroup className='d-flex mb-0'>
                  <Button type="submit" disabled={loading} className='mr-1' color='primary' onClick={handleSubmit}>
                    {loading ? <Fragment>
                      <Spinner size='sm' />
                      <span className='ml-50'>Loading...</span>
                    </Fragment> : <span>Save Setting</span>}
                  </Button>
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
        </Card>
      }
    </div>
  )
}

export default Setting
