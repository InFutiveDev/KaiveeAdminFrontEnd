import { memo, useState, Fragment, useEffect } from "react";

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
  CustomInput,
} from "reactstrap";

// ** Icons from react-feather
import { ArrowLeft } from "react-feather";
// ** React routings method  or component
import { useHistory } from "react-router-dom";

// ** redux hools and store
import { useDispatch, useSelector } from "react-redux";

import { useFormik } from "formik";
import { ADD_COUPON_BY_ADMIN } from "../../../../redux/actions/coupon";

// ** Utils funtion to check validation

import AddTestMultiSelect from "../addTest";

const AddCoupon = () => {
  // ** redux hools and store
  const dispatch = useDispatch();
  // ** states
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state.cities);

  const validateCoupon = (couponData) => {
    const errors = {};
    if (!couponData.coupon_code) {
      errors.coupon_code = "Please Enter Coupon Code";
    } else if (couponData.coupon_code.length > 15) {
      errors.coupon_code = "Coupon Code cannot exceed 15 characters";
    }
    if (!couponData.used_type) {
      errors.used_type = "Please Select Used Type";
    }
    if (!couponData.discount) {
      errors.discount = "Please Enter Discount Value";
    }
    if (!couponData.max_value) {
      errors.max_value = "Please Enter Discont max value";
    }
    if (!couponData.discount_type) {
      errors.discount_type = "Please select Type";
    }
    if (!couponData.validity) {
      errors.validity = "Please Select Validity Date";
    }
    if (!couponData.minimum_amount) {
      errors.minimum_amount = "Please Enter minimun Amount";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      coupon_code: "",
      used_type: "",
      discount: "",
      max_value: "",
      discount_type: "",
      validity: "",
      minimum_amount: "",
      valid_all_test: false,
      selected_test: false,
      addTest: null,
    },
    validate: validateCoupon,
    onSubmit: async (values) => {
      setLoading(true);

      // If addTest is not null, extract only the value property.
      const formattedValues = {
        ...values,
        addTest: values.addTest ? values.addTest.value : null,
      };

      const res = await dispatch(ADD_COUPON_BY_ADMIN(formattedValues));
      if (res?.success) {
        history.push("/apps/coupon/all");
      } else {
        setLoading(false);
      }
    },
  });

  const handleAddTest = (test) => {
    formik.setFieldValue("selected_test", test);
  };

  return (
    <div>
      <Card>
        <CardHeader className="w-100">
          <div className="w-100 d-flex align-items-center justify-content-between">
            <h4>Add Coupon</h4>
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
          <form onSubmit={formik.handleSubmit}>
            <Row>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="coupon_code">
                    Coupon Code{" "}
                    <span className="text-danger">
                      <sup>
                        <b>*</b>
                      </sup>
                    </span>
                  </Label>
                  <Input
                    type="text"
                    name="coupon_code"
                    id="coupon_code"
                    placeholder="Enter Code"
                    value={formik.values.coupon_code}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.coupon_code && formik.errors.coupon_code ? (
                    <span style={{ color: "red" }}>
                      {formik.errors.coupon_code}
                    </span>
                  ) : null}
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="used_type">
                    Coupon Used Type
                    <span className="text-danger"></span>
                  </Label>
                  <Input
                    type="select"
                    name="used_type"
                    id="used_type"
                    placeholder="Select type"
                    value={formik.values.used_type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="onetime">One Time</option>
                    <option value="multipletimes">Multiple Times</option>
                  </Input>
                  {formik.touched.used_type && formik.errors.used_type ? (
                    <span style={{ color: "red" }}>
                      {formik.errors.used_type}
                    </span>
                  ) : null}
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="discount">
                    Discount Value{" "}
                    <span className="text-danger">
                      <sup>
                        <b>*</b>
                      </sup>
                    </span>
                  </Label>
                  <Input
                    type="number"
                    name="discount"
                    id="discount"
                    placeholder="Enter Discount Value"
                    value={formik.values.discount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.discount && formik.errors.discount ? (
                    <span style={{ color: "red" }}>
                      {formik.errors.discount}
                    </span>
                  ) : null}
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="max_value">
                    Discount Max Value{" "}
                    <span className="text-danger">
                      <sup>
                        <b>*</b>
                      </sup>
                    </span>
                  </Label>
                  <Input
                    type="number"
                    name="max_value"
                    id="max_value"
                    placeholder="Enter Discount Max Value"
                    value={formik.values.max_value}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.max_value && formik.errors.max_value ? (
                    <span style={{ color: "red" }}>
                      {formik.errors.max_value}
                    </span>
                  ) : null}
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="discount_type">
                    Discount Type{" "}
                    <span className="text-danger">
                      <sup>
                        <b>*</b>
                      </sup>
                    </span>
                  </Label>
                  <Input
                    type="select"
                    name="discount_type"
                    id="discount_type"
                    placeholder="Select type"
                    value={formik.values.discount_type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="percentage">Percentage</option>
                    <option value="amount">Amount</option>
                  </Input>
                  {formik.touched.discount_type &&
                  formik.errors.discount_type ? (
                    <span style={{ color: "red" }}>
                      {formik.errors.discount_type}
                    </span>
                  ) : null}
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="validity">
                    Validity{" "}
                    <span className="text-danger">
                      <sup>
                        <b>*</b>
                      </sup>
                    </span>
                  </Label>
                  <Input
                    type="date"
                    name="validity"
                    id="validity"
                    placeholder="Select Date"
                    value={formik.values.validity}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.validity && formik.errors.validity ? (
                    <span style={{ color: "red" }}>
                      {formik.errors.validity}
                    </span>
                  ) : null}
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="minimum_amount">
                    Minimum Amount{" "}
                    <span className="text-danger">
                      <sup>
                        <b>*</b>
                      </sup>
                    </span>
                  </Label>
                  <Input
                    type="number"
                    name="minimum_amount"
                    id="minimum_amount"
                    placeholder="Enter Minimum Amount"
                    value={formik.values.minimum_amount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.minimum_amount &&
                  formik.errors.minimum_amount ? (
                    <span style={{ color: "red" }}>
                      {formik.errors.minimum_amount}
                    </span>
                  ) : null}
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Row>
                    <Col md="6" sm="12">
                      <FormGroup>
                        <Label for="selected_test">
                          Select Test <span className="text-danger"></span>
                        </Label>
                        <CustomInput
                          type="switch"
                          id="selected_test"
                          name="selected_test"
                          className="ml-2"
                          checked={formik.values.selected_test}
                          onChange={(e) => {
                            formik.setFieldValue(
                              "selected_test",
                              e.target.checked
                            );
                            if (e.target.checked) {
                              formik.setFieldValue("addTest", null);
                            }
                          }}
                          onBlur={formik.handleBlur}
                          label=""
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6" sm="12">
                      <FormGroup>
                        <Label for="valid_all_test">
                          Valid All Test <span className="text-danger"></span>
                        </Label>
                        <CustomInput
                          type="switch"
                          id="valid_all_test"
                          name="valid_all_test"
                          className="ml-2"
                          checked={formik.values.valid_all_test}
                          onChange={(e) => {
                            formik.setFieldValue(
                              "valid_all_test",
                              e.target.checked
                            );
                          }}
                          onBlur={formik.handleBlur}
                          label=""
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
            </Row>
            {formik.values.selected_test && (
              <Row>
                <Col md="6" sm="12">
                  <FormGroup>
                    <Label for="addTest">
                      <span className="text-danger"></span>
                    </Label>
                    <AddTestMultiSelect
                      handleAddTest={(test) => {
                        formik.setFieldValue("selected_test", test);
                      }}
                      setFieldValue={formik.setFieldValue}
                      value={formik.values.addTest}
                    />
                  </FormGroup>
                </Col>
              </Row>
            )}
            <Button.Ripple
              color="primary"
              type="submit"
              disabled={loading}
              className="mr-1"
            >
              {loading ? (
                <Spinner color="white" size="sm" />
              ) : (
                <span>Submit</span>
              )}
            </Button.Ripple>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
export default AddCoupon;
