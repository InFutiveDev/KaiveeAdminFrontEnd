import { ErrorMessage, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { ArrowLeft } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import {
  ADD_MENU,
  GET_MENU_BY_ID,
  UPDATE_MENU,
} from "../../../../redux/actions/menu";
import { useHistory, useParams } from "react-router-dom";

const MenuAdd = () => {
  const [loading, setLoading] = useState(false);
  const { menuByID } = useSelector((store) => store.menuReducer);

  const dispatch = useDispatch();
  const history = useHistory();
  const { menuID } = useParams();

  // ** Formik Initial values

  const initialValues = {
    MenuTitle: menuByID?.data?.MenuTitle || "",
    MenuPostion: menuByID?.data?.MenuPostion || "",
    MenuURL: menuByID?.data?.MenuURL || "",
    MenuStatus: menuByID?.data?.MenuStatus || true,
  };

  // ** Validation schema
  //   const validationSchema = Yup.object().shape({
  //     microMarketTitle: Yup.string().required("Micro Market Title is required"),
  //   });

  const handleFormSubmit = async (values) => {
    const payload = { ...values };
    const res = await dispatch(UPDATE_MENU(menuID, payload));
    if (res?.success) {
      history.push("/admin/apps/menu/all");
    }
  };

  useEffect(() => {
    dispatch(GET_MENU_BY_ID(menuID));
  }, [menuID]);

  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        // onSubmit={handleFormSubmit}
        // validationSchema={validationSchema}
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
                    <h4>Edit Menu</h4>
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
                        <Label for="MenuTitle">
                          Menu Title{" "}
                          <span>
                            <sup>
                              <b>*</b>
                            </sup>
                          </span>
                        </Label>
                        <Input
                          type="text"
                          name="MenuTitle"
                          value={values.MenuTitle}
                          id="MenuTitle"
                          placeholder="Menu Title"
                          onChange={handleChange}
                        />
                      </FormGroup>
                      <div className="text-danger">
                        <ErrorMessage name="MenuTitle" />
                      </div>
                    </Col>
                    <Col md="4" sm="12">
                      <FormGroup>
                        <Label for="MenuPostion">
                          Menu Position{" "}
                          <span>
                            <sup>
                              <b>*</b>
                            </sup>
                          </span>
                        </Label>
                        <Input
                          type="number"
                          name="MenuPostion"
                          value={values.MenuPostion}
                          id="MenuPostion"
                          placeholder="Menu Position"
                          onChange={handleChange}
                        />
                      </FormGroup>
                      <div className="text-danger">
                        <ErrorMessage name="MenuPostion" />
                      </div>
                    </Col>
                    <Col md="4" sm="12">
                      <FormGroup>
                        <Label for="MenuURL">
                          Menu URL{" "}
                          <span>
                            <sup>
                              <b>*</b>
                            </sup>
                          </span>
                        </Label>
                        <Input
                          type="text"
                          name="MenuURL"
                          value={values.MenuURL}
                          id="MenuURL"
                          placeholder="Menu URL"
                          onChange={handleChange}
                        />
                      </FormGroup>
                      <div className="text-danger">
                        <ErrorMessage name="MenuURL" />
                      </div>
                    </Col>
                    {/* <Col md="4" sm="12">
                      <FormGroup>
                        <Label for="MenuStatus">
                          Menu Status{" "}
                          <span>
                            <sup>
                              <b>*</b>
                            </sup>
                          </span>
                        </Label>
                        <Input
                          type="text"
                          name="MenuStatus"
                          value={values.MenuStatus}
                          id="MenuStatus"
                          placeholder="Menu Status"
                          onChange={handleChange}
                        />
                      </FormGroup>
                      <div className="text-danger">
                        <ErrorMessage name="MenuStatus" />
                      </div>
                    </Col> */}
                    <Col md="4" sm="12">
                      <FormGroup>
                        <Label for="MenuStatus">
                          Menu Status{" "}
                          <span>
                            <sup>
                              <b>*</b>
                            </sup>
                          </span>
                        </Label>
                        <Input
                          type="select"
                          name="MenuStatus"
                          id="MenuStatus"
                          placeholder="Menu Status"
                          value={values.MenuStatus}
                          onChange={handleChange}
                        >
                          <option value="true">True</option>
                          <option value="false">False</option>
                        </Input>
                        <div className="text-danger">
                          <ErrorMessage name="MenuStatus" />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col sm="12">
                      <FormGroup className="d-flex mb-0 mt-2">
                        <Button
                          type="button"
                          disabled={loading}
                          className="mr-1"
                          onClick={() => handleFormSubmit(values)}
                          color="primary"
                        >
                          {loading ? (
                            <Fragment>
                              <Spinner size="sm" />
                              <span className="ml-50">Loading...</span>
                            </Fragment>
                          ) : (
                            <span>Update Menu</span>
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
