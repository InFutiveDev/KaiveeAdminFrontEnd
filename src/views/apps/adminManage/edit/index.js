import { useState, Fragment, useEffect } from "react";

// ** Bootsrap components
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Row,
  Col,
  Input,
  Button,
  Label,
  Spinner,
} from "reactstrap";

// ** Icons from react-feather
import { ArrowLeft } from "react-feather";
// ** React routings method  or component
import { useHistory, useParams } from "react-router-dom";

// ** redux hools and store
import { useDispatch, useSelector } from "react-redux";

import { ErrorMessage, Form, Formik } from "formik";

import * as Yup from "yup";
import { GET_ADMIN_ROLE } from "../../../../redux/actions/adminRole";
import {
  ADD_ADMIN_MANAGE,
  GET_ADMIN_MANAGE_BY_ID,
  UPDATE_ADMIN_MANAGE,
} from "../../../../redux/actions/adminManage";

// ** Utils funtion to check validation

const AddAdminManage = () => {
  // ** redux hools and store
  const dispatch = useDispatch();

  const { manageID } = useParams();
  // ** states
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state.cities);
  const { adminRoleList } = useSelector((state) => state.adminRoleReducer);
  const { adminManageByID } = useSelector((state) => state.adminManageReducer);

  // ** Formik Initial values

  const initialValues = {
    name: adminManageByID?.data[0]?.name || "",
    email: adminManageByID?.data[0]?.emailId || "",
    secondaryEmail: adminManageByID?.data[0]?.secondaryEmailId || "",
    password: "",
    role: adminManageByID?.data[0]?.role?._id || "",
  };

  // ** Validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    name: Yup.string().required("Name is required"),
    role: Yup.string().required("role is required"),
  });

  const handleFormSubmit = async (values) => {
    setLoading(true);
    const payload = { ...values };
    if (payload?.password === "") {
      payload.password = adminManageByID?.data[0]?.password;
    }
    const res = await dispatch(UPDATE_ADMIN_MANAGE(manageID, payload));
    if (res?.success) {
      history.push("/admin/apps/admin-management/all");
    }
    setLoading(false);
  };

  useEffect(() => {
    dispatch(GET_ADMIN_ROLE(1, ""));
  }, []);
  useEffect(() => {
    dispatch(GET_ADMIN_MANAGE_BY_ID(manageID));
  }, [manageID]);

  return (
    <div>
      {/* {!citiesList ? (
        <>
          <SpinnerFallback />
        </>
      ) : ( */}
      <Card>
        <CardHeader className="w-100">
          <div className="w-100 d-flex align-items-center justify-content-between">
            <h4>Edit Admin Manage</h4>
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
          <Formik
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            validationSchema={validationSchema}
            enableReinitialize={true}
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
                <Row>
                  <Col md="4" sm="12">
                    <FormGroup>
                      <Label for="name">
                        Name{" "}
                        <span className="text-danger">
                          <sup>
                            <b>*</b>
                          </sup>
                        </span>
                      </Label>
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Full Name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <div className="text-danger">
                        <ErrorMessage name="name" />
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="4" sm="12">
                    <FormGroup>
                      <Label for="email">
                        Email Id
                        <span className="text-danger">
                          <sup>
                            <b>*</b>
                          </sup>
                        </span>
                      </Label>
                      <Input
                        type="email"
                        name="email"
                        id="emailId"
                        placeholder="Email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        readOnly
                      />
                      <div className="text-danger">
                        <ErrorMessage name="email" />
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="4" sm="12">
                    <FormGroup>
                      <Label for="secondaryEmail">
                        Secondary Email
                        <span className="text-danger"></span>
                      </Label>
                      <Input
                        type="email"
                        name="secondaryEmail"
                        id="secondaryEmail"
                        placeholder="Secondary Email"
                        value={values.secondaryEmail}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4" sm="12">
                    <FormGroup>
                      <Label for="password">Password</Label>
                      <Input
                        type="text"
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {/* <div className="text-danger">
                        <ErrorMessage name="password" />
                      </div> */}
                    </FormGroup>
                  </Col>
                  <Col md="4" sm="12">
                    <FormGroup>
                      <Label for="state">
                        Role{" "}
                        <span>
                          <sup>
                            <b>*</b>
                          </sup>
                        </span>
                      </Label>
                      <Input
                        type="select"
                        name="role"
                        id="role"
                        placeholder="Role"
                        value={values.role}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      >
                        <option value="">Choose Role</option>
                        {adminRoleList?.data?.data?.map((item, index) => (
                          <option value={item?._id} key={index}>
                            {item?.RoleTitle}
                          </option>
                        ))}
                      </Input>
                      <div className="text-danger">
                        <ErrorMessage name="role" />
                      </div>
                    </FormGroup>
                  </Col>

                  <Col sm="12">
                    <FormGroup className="d-flex mb-0">
                      <Button
                        type="submit"
                        disabled={loading}
                        className="mr-1"
                        color="primary"
                      >
                        {loading ? (
                          <Fragment>
                            <Spinner size="sm" />
                            <span className="ml-50">Loading...</span>
                          </Fragment>
                        ) : (
                          <span>Update Admin Manage</span>
                        )}
                      </Button>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
      {/* )} */}
    </div>
  );
};
export default AddAdminManage;
