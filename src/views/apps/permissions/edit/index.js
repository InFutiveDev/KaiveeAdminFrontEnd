import { ErrorMessage, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { ArrowLeft } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
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
  Spinner,
} from "reactstrap";
import {
  ADD_MENU,
  GET_ALL_MENU,
  GET_ALL_MENU_WITHOUT_OFFSET,
} from "../../../../redux/actions/menu";
import { useHistory, useParams } from "react-router-dom";
import {
  ADD_ADMIN_ROLE,
  GET_ADMIN_ROLE_BY_ID,
  UPDATE_ADMIN_ROLE,
} from "../../../../redux/actions/adminRole";
import { Fragment } from "react";
import * as Yup from "yup";

// const allToppings = [
//   { name: "Golden Corn", checked: false },
//   { name: "Paneer", checked: false },
//   { name: "Tomato", checked: false },
//   { name: "Mushroom", checked: false },
//   { name: "Onion", checked: false },
//   { name: "Black Olives", checked: false },
// ];

export const Checkbox = ({ isChecked, label, checkHandler, index }) => {
  return (
    <div className="d-flex align-items-center mb-1">
      <input
        type="checkbox"
        id={`checkbox-${index}`}
        checked={isChecked}
        onChange={checkHandler}
      />
      <label className="mb-0 ml-2" htmlFor={`checkbox-${index}`}>
        {label}
      </label>
    </div>
  );
};

const EditAdminRole = () => {
  const [loading, setLoading] = useState(false);
  const [menuList, setMenuList] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();

  const { menuAllListWithoutOffest } = useSelector(
    (state) => state.menuReducer
  );
  const { adminRoleByID } = useSelector((state) => state.adminRoleReducer);
  const { permissionID } = useParams();

  const updateCheckStatus = (id) => {
    if (!menuList?.includes(id)) {
      setMenuList([...menuList, id]);
    } else {
      setMenuList(menuList?.filter((ele) => ele !== id));
    }
  };

  // ** Formik Initial values

  const initialValues = {
    RoleTitle: adminRoleByID?.data?.RoleTitle || "",
    RoleMenu: [],
  };

  // ** Validation schema
  const validationSchema = Yup.object().shape({
    RoleTitle: Yup.string().required("Role Title is required"),
  });

  const handleFormSubmit = async (values) => {
    setLoading(true);
    let payLoad = { ...values };
    payLoad = { ...payLoad, RoleMenu: [...menuList] };
    const res = await dispatch(UPDATE_ADMIN_ROLE(permissionID, payLoad));
    if (res?.success) {
      history.push("/admin/apps/permissions/all");
    }
    setLoading(false);
  };

  useEffect(() => {
    dispatch(GET_ALL_MENU_WITHOUT_OFFSET());
  }, []);
  useEffect(() => {
    dispatch(GET_ADMIN_ROLE_BY_ID(permissionID));
  }, [permissionID]);
  useEffect(() => {
    if (adminRoleByID?.data?.RoleMenu) {
      setMenuList([...adminRoleByID?.data?.RoleMenu]);
    }
  }, [adminRoleByID?.data?.RoleMenu]);

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        enableReinitialize={true}
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
                    <h4>Edit Admin Role</h4>
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
                        <Label for="RoleTitle">
                          Role Title{" "}
                          <span>
                            <sup>
                              <b>*</b>
                            </sup>
                          </span>
                        </Label>
                        <Input
                          type="text"
                          name="RoleTitle"
                          value={values.RoleTitle}
                          id="RoleTitle"
                          placeholder="Role Title"
                          onChange={handleChange}
                        />
                      </FormGroup>
                      <div className="text-danger">
                        <ErrorMessage name="RoleTitle" />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <div className="px-2">
                      {menuAllListWithoutOffest?.data?.data?.map(
                        (menu, index) => (
                          <Checkbox
                            key={menu._id}
                            isChecked={menuList?.includes(menu._id)}
                            checkHandler={() => updateCheckStatus(menu._id)}
                            label={menu.MenuTitle}
                            index={index}
                          />
                        )
                      )}
                    </div>
                    <Col sm="12">
                      <FormGroup className="d-flex mb-0 mt-2">
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
                            <span>Update Permissions</span>
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

export default EditAdminRole;
