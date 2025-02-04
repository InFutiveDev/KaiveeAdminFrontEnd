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
import { useHistory, useParams } from "react-router-dom";

import EditTest from "../editTest";

// ** redux hooks and store
import { useDispatch, useSelector } from "react-redux";
import {
  GET_COUPON_BY_ID,
  COUPON_UPDATE,
} from "../../../../redux/actions/coupon";
import SpinnerComponent from "../../../../@core/components/spinner/Fallback-spinner";

// ** Utils function to check validation
import { useFormik } from "formik";

const EditCoupon = () => {
  // ** redux hooks and store
  const dispatch = useDispatch();
  // ** states
  const history = useHistory();
  const { couponId } = useParams();
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state.coupon);
  const { coupon } = store;

  const validateCoupon = (couponData) => {
    const errors = {};
    if (!couponData.coupon_code) {
      errors.coupon_code = "Please Enter Coupon Code";
    }
    if (!couponData.used_type) {
      errors.used_type = "Please Select Used Type";
    }
    if (!couponData.discount_type) {
      errors.discount_type = "Please select Type";
    }
    if (!couponData.discount) {
      errors.discount = "Please Enter Discount Value";
    }
    if (!couponData.validity) {
      errors.validity = "Please Select Validity Date";
    }
    if (!couponData.minimum_amount) {
      errors.minimum_amount = "Please Enter Minimum Amount";
    }
    if (!couponData.max_value) {
      errors.max_value = "Please Enter Discount Max Value";
    }
    // Only check for editTest if selected_test is true and valid_all_test is false
    if (
      couponData.selected_test &&
      !couponData.valid_all_test &&
      !couponData.editTest
    ) {
      errors.editTest = "Please Select Test";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      coupon_code: "",
      used_type: "",
      discount_type: "",
      discount: "",
      validity: "",
      minimum_amount: "",
      max_value: "",
      selected_test: false,
      valid_all_test: false,
      addTest: null,
    },
    validate: validateCoupon,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const formattedValues = {
          ...values,
          addTest: values.addTest ? values.addTest.value : null,
        };

        const res = await dispatch(COUPON_UPDATE(couponId, formattedValues));
        if (res?.success) {
          history.push("/apps/coupon/all");
        }
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    dispatch(GET_COUPON_BY_ID(couponId));
  }, [couponId, dispatch]);

  useEffect(() => {
    if (coupon?.data && coupon?.data.length) {
      const editTestData = coupon.data[0].addTest
        ? {
            label: coupon.data[0].addTest.test_name,
            value: coupon.data[0].addTest._id,
          }
        : null;

      formik.setValues({
        ...formik.initialValues,
        ...coupon.data[0],
        addTest: editTestData,
      });
    }
  }, [coupon?.data]);

  useEffect(() => {
    if (formik.values.selected_test) {
      formik.setFieldValue("valid_all_test", false);
      formik.setFieldValue("editTest", null);
    }
  }, [formik.values.selected_test]);

  return (
    <div>
      {!coupon?.data || !coupon?.data.length ? (
        <SpinnerComponent />
      ) : (
        <Card>
          <CardHeader className="w-100">
            <div className="w-100 d-flex align-items-center justify-content-between">
              <h4>Update Coupon</h4>{" "}
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
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="name">
                    Coupon Code <span className="text-danger"></span>
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
                  <Label>
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
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="discount_type">
                    Coupon Discount Type
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
                    placeholder="Enter Discount Type"
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
                  <Label>
                    Coupon Discount Value
                    <span className="text-danger">
                      <sup>
                        <b>*</b>
                      </sup>
                    </span>
                  </Label>
                  <Input
                    type="text"
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
                  <Label>
                    Valid Upto
                    <span className="text-danger">
                      <sup>
                        <b>*</b>
                      </sup>
                    </span>
                  </Label>
                  <Input
                    type="date"
                    name="validity"
                    id="validity "
                    placeholder="Choose Date"
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
              <Col md="6" sm="12">
                <FormGroup>
                  <Label>
                    Minimun Amount Required
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
                    placeholder="Minumum Amount Required"
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
                  <Label>
                    Max Discounted Value
                    <span className="text-danger">
                      <sup>
                        <b>*</b>
                      </sup>
                    </span>
                  </Label>
                  <Input
                    type="number"
                    name=" max_value"
                    id="max_value"
                    placeholder="Max Discounted Value"
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
                          checked={formik.values.selected_test || ""}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            formik
                              .setFieldValue("selected_test", isChecked)
                              .then(() => {
                                if (isChecked) {
                                  formik.setFieldValue("valid_all_test", false);
                                  formik.setFieldValue("addTest", null);
                                }
                              });
                          }}
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
                          checked={formik.values.valid_all_test}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            formik.setFieldValue("valid_all_test", isChecked);
                            if (isChecked) {
                              formik.setFieldValue("selected_test", false);
                              formik.setFieldValue("addTest", null);
                            }
                          }}
                          label=""
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
              {formik.values.selected_test && !formik.values.valid_all_test && (
                <Col md="6" sm="12">
                  <FormGroup>
                    <Label for="Edit-Test">
                      <span className="text-danger"></span>
                    </Label>
                    <EditTest
                      setFieldValue={formik.setFieldValue}
                      value={formik.values.addTest}
                    />
                  </FormGroup>
                </Col>
              )}
              <Col sm="12">
                <FormGroup className="d-flex mb-0">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="mr-1"
                    color="primary"
                    onClick={formik.handleSubmit}
                  >
                    {loading ? (
                      <Fragment>
                        <Spinner size="sm" />
                        <span className="ml-50">Loading...</span>
                      </Fragment>
                    ) : (
                      <span>Update Coupon</span>
                    )}
                  </Button>
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
        </Card>
      )}
    </div>
  );
};
export default memo(EditCoupon);
