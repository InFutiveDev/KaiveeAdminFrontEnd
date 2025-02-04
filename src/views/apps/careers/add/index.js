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
  CustomInput,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { ADD_LAB } from "../../../../redux/actions/lab";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { ADD_CAREERS } from "../../../../redux/actions/careers";
import EditorCom from "../../../../@core/components/editor";

const MenuAdd = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  // ** Formik Initial values

  const initialValues = {
    job_title: "",
    job_posted: "",
    Address_1: "",
    job_Type_1: "",
    job_Type_2: "",
    Address_2: "",
    Contact_No: "",
    Experience_Requirement: "",
    job_title_url: "",
    Job_Description: "",
    Job_Status: "",
    Openings: "",
    meta_title: "",
    meta_description: "",
  };

  // ** Validation schema
  const validationSchema = Yup.object().shape({
    job_title: Yup.string().required("Required"),
    job_posted: Yup.string().required("Required"),
    Address_1: Yup.string().required("Required"),
    job_Type_1: Yup.string().required("Required"),
    job_Type_2: Yup.string().required("Required"),
    Address_2: Yup.string().required("Required"),
    Contact_No: Yup.string().required("Required"),
    Experience_Requirement: Yup.string().required("Required"),
    job_title_url: Yup.string().required("Required"),

    Job_Description: Yup.string().required("Required"),
    Job_Status: Yup.string().required("Required"),
    Openings: Yup.string().required("Required"),
  });

  const handleFormSubmit = async (values) => {
    const payload = { ...values };
    const res = await dispatch(ADD_CAREERS(payload));
    if (res?.success) {
      history.push("/admin/apps/careers/all");
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
                    <h4>Add Career</h4>
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
                        <Label for="job_title">
                          Job Title
                          <span>
                            <sup>
                              <b>*</b>
                            </sup>
                          </span>
                        </Label>
                        <Input
                          type="text"
                          name="job_title"
                          value={values.job_title}
                          id="job_title"
                          placeholder="Job Title"
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <div className="text-danger">
                          <ErrorMessage name="job_title" />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md="4" sm="12">
                      <FormGroup>
                        <Label for="job_posted">
                          Job Posted
                          <span>
                            <sup>
                              <b>*</b>
                            </sup>
                          </span>
                        </Label>
                        <Input
                          type="date"
                          name="job_posted"
                          id="job_posted"
                          placeholder="Choose Date"
                          value={values.job_posted}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <div className="text-danger">
                          <ErrorMessage name="job_posted" />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md="4" sm="12">
                      <FormGroup>
                        <Label for="job_Type_1">
                          Placement Type
                          <span>
                            <sup>
                              <b>*</b>
                            </sup>
                          </span>
                        </Label>

                        <Input
                          type="select"
                          name="job_Type_1"
                          id="job_Type_1"
                          placeholder="Select type"
                          value={values.job_Type_1}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option value="">Select Placement Type</option>

                          <option value="Full-time">Full Time</option>
                          <option value="Part-time">Part Time</option>
                        </Input>
                        <div className="text-danger">
                          <ErrorMessage name="job_Type_1" />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md="4" sm="12">
                      <FormGroup>
                        <Label for="job_Type_2">
                          Opportunity Type
                          <span>
                            <sup>
                              <b>*</b>
                            </sup>
                          </span>
                        </Label>

                        <Input
                          type="select"
                          name="job_Type_2"
                          id="job_Type_2"
                          placeholder="Select Opportunity Type"
                          value={values.job_Type_2}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option value="">Select Opportunity Type</option>
                          <option value="On-Site">On Site</option>
                          <option value="Hybrid">Hybrid</option>
                          <option value="Remote">Remote</option>
                        </Input>
                        <div className="text-danger">
                          <ErrorMessage name="job_Type_2" />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md="4" sm="12">
                      <FormGroup>
                        <Label for="Address_1">
                          Address 1
                          <span>
                            <sup>
                              <b>*</b>
                            </sup>
                          </span>
                        </Label>
                        <Input
                          type="text"
                          name="Address_1"
                          value={values.Address_1}
                          id="Address_1"
                          placeholder="Address 1"
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <div className="text-danger">
                          <ErrorMessage name="Address_1" />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md="12" sm="12">
                      <FormGroup>
                        <Label for="Address_2">
                          Address (Job Detail Page)
                          <span>
                            <sup>
                              <b>*</b>
                            </sup>
                          </span>
                        </Label>
                        <Input
                          type="text"
                          name="Address_2"
                          value={values.Address_2}
                          id="Address_2"
                          placeholder="Address (Job Detail Page)"
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <div className="text-danger">
                          <ErrorMessage name="Address_2" />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md="4" sm="12">
                      <FormGroup>
                        <Label for="Contact_No">
                          Contact No
                          <span>
                            <sup>
                              <b>*</b>
                            </sup>
                          </span>
                        </Label>
                        <Input
                          type="text"
                          name="Contact_No"
                          value={values.Contact_No}
                          id="Contact_No"
                          placeholder="Contact No"
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <div className="text-danger">
                          <ErrorMessage name="Contact_No" />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md="4" sm="12">
                      <FormGroup>
                        <Label for="Experience_Requirement">
                          Experience Requirement
                          <span>
                            <sup>
                              <b>*</b>
                            </sup>
                          </span>
                        </Label>
                        <Input
                          type="text"
                          name="Experience_Requirement"
                          value={values.Experience_Requirement}
                          id="Experience_Requirement"
                          placeholder="Experience Requirement"
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <div className="text-danger">
                          <ErrorMessage name="Experience_Requirement" />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md="4" sm="12">
                      <FormGroup>
                        <Label for="job_title_url">
                          Job Title Url
                          <span>
                            <sup>
                              <b>*</b>
                            </sup>
                          </span>
                        </Label>
                        <Input
                          type="text"
                          name="job_title_url"
                          value={values.job_title_url}
                          id="job_title_url"
                          placeholder="Job Title Url"
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <div className="text-danger">
                          <ErrorMessage name="job_title_url" />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md="12" sm="12">
                      <FormGroup>
                        <Label for="Job_Description">
                          Job Description
                          <span>
                            <sup>
                              <b>*</b>
                            </sup>
                          </span>
                        </Label>{" "}
                        <EditorCom
                          getContent={(htmlContentProp, name) => {
                            setFieldValue(name, htmlContentProp);
                          }}
                          name="Job_Description"
                        />
                        {/* <Input
                          type="text"
                          name="Job_Description"
                          value={values.Job_Description}
                          id="Job_Description"
                          placeholder="Address 2"
                          onBlur={handleBlur}
                          onChange={handleChange}
                        /> */}
                        <div className="text-danger">
                          <ErrorMessage name="Job_Description" />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md="4" sm="12">
                      <FormGroup>
                        <Label>
                          Job Status
                          <span className="text-danger">
                            <sup>
                              <b>*</b>
                            </sup>
                          </span>
                        </Label>

                        <Row>
                          <Col md="3" sm="12">
                            <CustomInput
                              type="radio"
                              id="status-active"
                              name="Job_Status"
                              value={"Active"}
                              onChange={handleChange}
                              label="Active"
                            />
                          </Col>
                          <Col md="3" sm="12">
                            <CustomInput
                              type="radio"
                              id="status-inactive"
                              name="Job_Status"
                              value={"InActive"}
                              onChange={handleChange}
                              label="Inactive"
                            />
                          </Col>
                        </Row>
                        <div className="text-danger">
                          <ErrorMessage name="Job_Status" />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md="4" sm="12">
                      <FormGroup>
                        <Label>
                          Openings
                          <span className="text-danger">
                            <sup>
                              <b>*</b>
                            </sup>
                          </span>
                        </Label>
                        <Input
                          type="number"
                          name="Openings"
                          value={values.Openings}
                          id="Openings"
                          placeholder="Openings"
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <div className="text-danger">
                          <ErrorMessage name="Openings" />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md="4" sm="12">
                      <FormGroup>
                        <Label>
                        Meta-title
                          <span className="text-danger">
                            <sup>
                              <b>*</b>
                            </sup>
                          </span>
                        </Label>
                        <Input
                          type="text"
                          name="meta_title"
                          value={values.meta_title}
                          id="meta_title"
                          placeholder="Meta title"
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <div className="text-danger">
                          <ErrorMessage name="Meta-title" />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md="4" sm="12">
                      <FormGroup>
                        <Label>
                        meta_description
                          <span className="text-danger">
                            <sup>
                              <b>*</b>
                            </sup>
                          </span>
                        </Label>
                        <Input
                          type="text"
                          name="meta_description"
                          value={values.meta_description}
                          id="meta_description"
                          placeholder="meta description"
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <div className="text-danger">
                          <ErrorMessage name="meta_description" />
                        </div>
                      </FormGroup>
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
                            <span>Job Post</span>
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
