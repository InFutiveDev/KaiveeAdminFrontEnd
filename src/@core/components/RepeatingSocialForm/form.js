import { Trash2 } from "react-feather"
import { Button, Col, CustomInput, Form, FormGroup, Input, Label, Row } from "reactstrap"
import socialListoption from './socialList.json'

const FormCom = (props) => {
    const { item, handleSocialId,
        handleSocialValue,
        deleteForm,
        index } = props
    return (
        <Form>
            <Row className='justify-content-between align-items-center'>
                <Col sm={4} lg={4} md={4}>
                    <FormGroup>
                        <Label for={`item-name-${index}`}>Social Name</Label>
                        <CustomInput type='select'
                            onChange={handleSocialId}
                            className={`form-control`}
                            name={index}
                            defaultValue={Object.keys(item)[0]}
                            id={`social-id ${index}`}>
                            <option value={'select'}></option>
                            {
                                socialListoption?.map((socialItem, i) => {
                                    return <option key={socialItem?.name} value={socialItem?.name}>{socialItem?.name}</option>
                                })
                            }
                        </CustomInput>
                    </FormGroup>
                </Col>
                <Col sm={6} lg={6} md={6}>
                    <FormGroup>
                        <Label for={`link-${index}`}>Link</Label>
                        <Input
                            onChange={handleSocialValue}
                            name={index}
                            defaultValue={Object.values(item)[0]}
                            id={`link-${index}`} />
                    </FormGroup>
                </Col>
                <Col sm={2} lg={2} md={2}>
                    <Button.Ripple color='danger' className='text-nowrap' onClick={(e) => { deleteForm(index) }} outline>
                        <Trash2 size={14} />
                    </Button.Ripple>
                </Col>
            </Row>
        </Form>
    )
}

export default FormCom