import { ErrorMessage, Form, Formik } from "formik";
import React, { useState } from "react";
import { ArrowLeft } from "react-feather";
import { useDispatch } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { ADD_LAB } from "../../../../redux/actions/lab";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

const MenuAdd = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  // ** Formik Initial values

  const initialValues = {
    branch_Name: "",
    branch_address: "",
    branch_location: "",
    map_url: "",
    contact_number: "",
    timing: "",
    email: "",
  };

  // ** Validation schema
  const validationSchema = Yup.object().shape({
    branch_Name: Yup.string().required("Required"),
    branch_address: Yup.string().required("Required"),
    branch_location: Yup.string().required("Required"),
    map_url: Yup.string().required("Required"),
    contact_number: Yup.string().required("Required"),
    timing: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
  });

  const handleFormSubmit = async (values) => {
    const payload = { ...values };
    const res = await dispatch(ADD_LAB(payload));
    if (res?.success) {
      history.push("/admin/apps/lab/all");
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        validationSchema={validationSchema}
      >
        {({
          values,
          handleChange,
          handleBlur,
          setFieldValue,
          touched,
          errors,
        }) => (
          <Form>
            <div>
              <Card>
                <CardHeader className="w-100">
                  <div className="w-100 d-flex align-items-center justify-content-between">
                    <h4>Add Menu</h4>
                    <Button.Ripple
                      onClick={() => {
                        history.goBack();
                      }}
                      color="primary"
                      outline
                    >
                      <ArrowLeft size={16} className="mr-1" />
                      Back
                    </Button.Ripple>
                  </div>
                </CardHeader>

                <CardBody>
                  <Row>
                    <Col md="4" sm="12">
                      <FormGroup>
                        <Label for="branch_Name">
                          Branch Name
                          <span>
                            <sup>
                              <b>*</b>
                            </sup>
                          </span>
                        </Label>
                        <Input
                          type="text"
                          name="branch_Name"
                          value={values.branch_Name}
                          id="branch_Name"
                          placeholder="Branch Name"
                          onChange={handleChange}
                        />
                      </FormGroup>
                      <div className="text-danger">
                        <ErrorMessage name="branch_Name" />
                      </div>
                    </Col>
                    <Col md="4" sm="12">
                      <FormGroup>
                        <Label for="branch_address">
                          Branch Address
                          <span>
                            <sup>
                              <b>*</b>
                            </sup>
                          </span>
                        </Label>
                        <Input
                          type="text"
                          name="branch_address"
                          value={values.branch_address}
                          id="branch_address"
                          placeholder="Branch Address"
                          onChange={handleChange}
                        />
                      </FormGroup>
                      <div className="text-danger">
                        <ErrorMessage name="branch_address" />
                      </div>
                    </Col>
                    <Col md="4" sm="12">
                      <FormGroup>
                        <Label for="branch_location">
                          Branch Location
                          <span>
                            <sup>
                              <b>*</b>
                            </sup>
                          </span>
                        </Label>
                        <Input
                          type="text"
                          name="branch_location"
                          value={values.branch_location}
                          id="branch_location"
                          placeholder="Branch Location"
                          onChange={handleChange}
                        />
                      </FormGroup>
                      <div className="text-danger">
                        <ErrorMessage name="branch_location" />
                      </div>
                    </Col>
                    <Col md="4" sm="12">
                      <FormGroup>
                        <Label for="contact_number">
                          Contact No
                          <span>
                            <sup>
                              <b>*</b>
                            </sup>
                          </span>
                        </Label>
                        <Input
                          type="text"
                          name="contact_number"
                          value={values.contact_number}
                          id="contact_number"
                          placeholder="Contact No"
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <div className="text-danger">
                          <ErrorMessage name="contact_number" />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md="4" sm="12">
                      <FormGroup>
                        <Label for="email">
                          Email
                          <span>
                            <sup>
                              <b>*</b>
                            </sup>
                          </span>
                        </Label>
                        <Input
                          type="email"
                          name="email"
                          value={values.email}
                          id="email"
                          placeholder="Email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <div className="text-danger">
                          <ErrorMessage name="email" />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md="4" sm="12">
                      <FormGroup>
                        <Label for="timing">
                          timing
                          <span>
                            <sup>
                              <b>*</b>
                            </sup>
                          </span>
                        </Label>
                        <Input
                          type="text"
                          name="timing"
                          value={values.timing}
                          id="timing"
                          placeholder="timing"
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <div className="text-danger">
                          <ErrorMessage name="timing" />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md="12" sm="12">
                      <FormGroup>
                        <Label for="map_url">
                          Map Url
                          <span>
                            <sup>
                              <b>*</b>
                            </sup>
                          </span>
                        </Label>
                        <Input
                          type="text"
                          name="map_url"
                          value={values.map_url}
                          id="map_url"
                          placeholder="Map Url"
                          onChange={handleChange}
                        />
                      </FormGroup>
                      <div className="text-danger">
                        <ErrorMessage name="map_url" />
                      </div>
                    </Col>

                    <Col sm="12">
                      <FormGroup className="d-flex mb-0 mt-2">
                        <Button
                          type="submit"
                          disabled={loading}
                          className="mr-1"
                          // onClick={() => handleFormSubmit(values)}
                          color="primary"
                        >
                          {loading ? (
                            <Fragment>
                              <Spinner size="sm" />
                              <span className="ml-50">Loading...</span>
                            </Fragment>
                          ) : (
                            <span>Add Lab</span>
                          )}
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default MenuAdd;
