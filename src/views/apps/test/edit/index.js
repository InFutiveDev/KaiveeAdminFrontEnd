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
import { ArrowLeft, Trash } from "react-feather";
// ** React routings method  or component
import { useHistory, useParams } from "react-router-dom";

// ** redux hools and store
import { useDispatch, useSelector } from "react-redux";

import EditorCom from "../../../../@core/components/editor";
import {
  GET_ALL_HABITS,
  GET_TEST_BY_ID,
  TEST_UPDATE,
} from "../../../../redux/actions/test";
import SpinnerComponent from "../../../../@core/components/spinner/Fallback-spinner";
import { GET_ALL_HEALTH_RISKS } from "../../../../redux/actions/healthRisk";
import { GET_ALL_CATEGORIES } from "../../../../redux/actions/category";
import { CheckObjectValidation } from "../../../../utility/Utils";
import AsyncSelect from "react-select";
import { selectThemeColors } from "@utils";
// ** Utils funtion to check validation

const EditTest = () => {
  // ** redux hools and store
  const dispatch = useDispatch();
  // ** states
  const history = useHistory();
  const { testId } = useParams();
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);
  const {
    test: { test, habits },
    healthRisk: { healthRisks },
    category: { categories },
  } = store;
  // const { habits } = test;
  const [payload, setPayload] = useState("");
  const [info, setInfo] = useState("");
  const [preparation, setPreparation] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [component, setComponent] = useState("");
  const [errorKeyName, setErrorKeyName] = useState("");
  const categoryOptions = [
    { value: "main-category", title: "Main Category" },
    { value: "liver-fibroscan", title: "Liver FibroScan" },
    { value: "health-packages", title: "Health Packages" },
    { value: "3t-mri", title: "3T-MRI" },
    { value: "x-ray", title: "X-RAY" },
    { value: "uroflow", title: "UROFLOW" },
    { value: "color-doppler&ultrasound", title: "Color Doppler & Untrasound" },
    { value: "neurology", title: "NEUROLOGY" },
    { value: "mri", title: "MRI" },
    { value: "miscellaneous-tests", title: "MiscellaneouS Tests" },
    { value: "mammography", title: "Mammography" },
    { value: "cardiology-test", title: "Cardiology Test" },
    { value: "cbct&dental-imaging", title: "CBCT & Dental Imaging" },
    { value: "ct-scan", title: "CT-SCAN" },
    { value: "bmd-or-dexa-scan", title: "BMD or Dexa Scan" },
    { value: "pathology-laboratory", title: "Pathology Laboratory" },
  ];

  const getContent = (htmlContentProp, name) => {
    if (name === "test_pre_test_info") setInfo(htmlContentProp);
    if (name === "test_components") setComponent(htmlContentProp);
    if (name === "preparation") setPreparation(htmlContentProp);
  };

  const handleFile = (e) => {
    const { name, files } = e.target;
    setImagePreview(URL.createObjectURL(files[0]));
    setPayload({ ...payload, [name]: files[0] });
  };

  const handleChangeCheck = (e) => {
    const { name, value } = e.target;

    setPayload({ ...payload, [name]: Number(value) ? true : false });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("dfdfdfd", value);
    setPayload({ ...payload, [name]: value });
  };

  const handleSubmit = async () => {
    let data = {
      ...payload,
      code: payload?.itdose_code_status ? payload?.itdose_code : payload?.code,
      by_healthRisk: payload?.by_healthRisk
        ?.map((item) => item.value)
        ?.join(","),
      by_habits: payload?.by_habits?.map((item) => item.value)?.join(","),
      test_name: payload?.itdose_test_name_status
        ? payload?.itdose_test_name
        : payload?.test_name,
      department: payload?.itdose_department_status
        ? payload?.itdose_department
        : payload?.department,
      mrp: payload?.itdose_offer_price_status
        ? payload?.itdose_offer_price
        : payload?.mrp,
      test_pre_test_info: info,
      test_components: component,
      preparation: preparation,
    };
    console.log("data--->>", data);
    const { test_url, ...rest } = payload;

    const checkValidation = CheckObjectValidation({ test_url, rest }, []);
    setErrorKeyName(checkValidation.keyname);

    if (checkValidation?.isvalid) {
      setLoading(true);
      console.log("data--->>", data);
      const res = await dispatch(TEST_UPDATE(testId, data));
      if (res?.success) {
        history.push("/apps/test/all");
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  };

  const dataOptions = () => {
    const modifiedData = test?.data[0]?.by_habits?.map((item) => {
      const label = habits?.data?.hebitData?.find(
        (ele) => ele?._id === item
      )?.hebitName;

      return { label, value: item };
    });
    return modifiedData;
  };

  const handleSelectedValue = (rows) => {
    // setSelectedTest(rows);
    setPayload({ ...payload, by_habits: rows });
  };
  const handleHealthRisk = (rows) => {
    // setSelectedTest(rows);
    setPayload({ ...payload, by_healthRisk: rows });
  };
  useEffect(() => {
    dispatch(GET_ALL_CATEGORIES(1, 100));
    dispatch(GET_TEST_BY_ID(testId));
    dispatch(GET_ALL_HEALTH_RISKS(1, "", 50));
    dispatch(GET_ALL_HABITS());
  }, []);
  console.log("test-data", test?.data);
  useEffect(() => {
    if (test?.data.length) {
      setPayload({
        ...test?.data[0],
        // by_habits: test?.data[0]?.by_habits?.map((item) => {
        //   const label = healthRisks?.data?.hebitData?.find(
        //     (ele) => ele?._id === item
        //   )?.hebitName;

        //   return { label, value: item };
        // }),

        by_healthRisk: test?.data[0]?.by_healthRisk?.map((item) => {
          return { label: item?.healthRiskTitle, value: item?._id };
        }),
        by_habits: test?.data[0]?.by_habits?.map((item) => {
          return { label: item?.hebitName, value: item?._id };
        }),
      });
      setInfo(test?.data[0]?.test_pre_test_info);
      setComponent(test?.data[0]?.test_components);
      setPreparation(test?.data[0]?.preparation);
      setImagePreview(test?.data[0]?.package_image);
    }
  }, [test?.data]);

  return (
    <div>
      {!payload ? (
        <SpinnerComponent />
      ) : (
        <Card>
          <CardHeader className="w-100">
            <div className="w-100 d-flex align-items-center justify-content-between">
              <h4>Update Test</h4>
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
                  <Label>Itdose Code</Label>
                  <Input
                    type="number"
                    name="itdose_code"
                    id="code"
                    placeholder="Enter Itdose Code"
                    disabled
                    value={payload?.itdose_code || ""}
                    onChange={handleChange}
                    // className="btn-outline-primary"
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label>Itdose Code Status</Label>
                  <Row>
                    <Col md="3" sm="12">
                      <CustomInput
                        type="checkbox"
                        id="status-active"
                        name="itdose_code_status"
                        defaultValue="1"
                        checked={payload?.itdose_code_status == true}
                        onChange={handleChangeCheck}
                        label="Active"
                        disabled
                      />
                    </Col>
                    <Col md="3" sm="12">
                      <CustomInput
                        type="checkbox"
                        id="status-inactive"
                        name="itdose_code_status"
                        defaultValue="0"
                        checked={payload?.itdose_code_status == false}
                        onChange={handleChangeCheck}
                        label="Inactive"
                        disabled
                      />
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label>Itdose Test Name</Label>
                  <Input
                    type="text"
                    name="itdose_test_name"
                    id="code"
                    placeholder="Enter Itdose Test Name"
                    value={payload?.itdose_test_name || ""}
                    onChange={handleChange}
                    disabled
                    // onChange={hanleIneputBase}
                    // className="btn-outline-primary"
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label>Itdose Test Name Status</Label>
                  <Row>
                    <Col md="3" sm="12">
                      <CustomInput
                        type="checkbox"
                        id="status-active1"
                        name="itdose_test_name_status"
                        defaultValue="1"
                        checked={payload?.itdose_test_name_status == true}
                        onChange={handleChangeCheck}
                        label="Active"
                        disabled
                      />
                    </Col>
                    <Col md="3" sm="12">
                      <CustomInput
                        type="checkbox"
                        id="status-inactive1"
                        name="itdose_test_name_status"
                        defaultValue="0"
                        checked={payload?.itdose_test_name_status == false}
                        onChange={handleChangeCheck}
                        label="Inactive"
                        disabled
                      />
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label>Itdose Offer Price</Label>
                  <Input
                    type="number"
                    name="itdose_offer_price"
                    id="code"
                    placeholder="Enter Itdose Offer Price"
                    value={payload?.itdose_offer_price || ""}
                    onChange={handleChange}
                    disabled
                    // onChange={hanleInputBase}
                    // className="btn-outline-primary"
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label>Itdose Offer Price Status</Label>
                  <Row>
                    <Col md="3" sm="12">
                      <CustomInput
                        type="checkbox"
                        id="status-active2"
                        name="itdose_offer_price_status"
                        defaultValue="1"
                        checked={payload?.itdose_offer_price_status == true}
                        onChange={handleChangeCheck}
                        disabled
                        label="Active"
                      />
                    </Col>
                    <Col md="3" sm="12">
                      <CustomInput
                        type="checkbox"
                        id="status-inactive2"
                        name="itdose_offer_price_status"
                        defaultValue="0"
                        checked={payload?.itdose_offer_price_status == false}
                        onChange={handleChangeCheck}
                        label="Inactive"
                        disabled
                      />
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label>Itdose Department</Label>
                  <Input
                    type="text"
                    name="itdose_department"
                    id="code"
                    placeholder="Enter Itdose Department"
                    value={payload?.itdose_department || ""}
                    onChange={handleChange}
                    disabled
                    // onChange={hanleInputBase}
                    // className="btn-outline-primary"
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label>Itdose Department Status</Label>
                  <Row>
                    <Col md="3" sm="12">
                      <CustomInput
                        type="checkbox"
                        id="status-active3"
                        name="itdose_department_status"
                        defaultValue="1"
                        checked={payload?.itdose_department_status == true}
                        onChange={handleChangeCheck}
                        disabled
                        label="Active"
                      />
                    </Col>
                    <Col md="3" sm="12">
                      <CustomInput
                        type="checkbox"
                        id="status-inactive3"
                        name="itdose_department_status"
                        defaultValue="0"
                        checked={payload?.itdose_department_status == false}
                        onChange={handleChangeCheck}
                        disabled
                        label="Inactive"
                      />
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label>
                    Test Code <span className="text-danger"></span>
                  </Label>

                  <Input
                    // type="text"
                    name="code"
                    id="code"
                    // placeholder="Enter Speciality Name"
                    disabled
                    value={
                      payload?.itdose_code_status
                        ? payload?.itdose_code
                        : payload?.code
                    }
                    onChange={handleChange}
                    className="btn-outline-primary"
                  />
                </FormGroup>
              </Col>

              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="name">
                    Test Name <span className="text-danger"></span>
                  </Label>
                  <Input
                    type="text"
                    name="test_name"
                    id="test_name"
                    placeholder="Enter Test Name"
                    value={
                      payload?.itdose_test_name_status
                        ? payload?.itdose_test_name
                        : payload?.test_name
                    }
                    onChange={handleChange}
                    className="btn-outline-primary"
                  />
                </FormGroup>
              </Col>

              <Col md="6" sm="12">
                <FormGroup>
                  <Label>
                    Department<span className="text-danger"></span>
                  </Label>
                  <Input
                    type="text"
                    name="department"
                    id="department"
                    placeholder="Enter Deparment"
                    value={
                      payload?.itdose_department_status
                        ? payload?.itdose_department
                        : payload?.department
                    }
                    onChange={handleChange}
                    className="btn-outline-primary"
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <Row>
                  <Col>
                    <FormGroup>
                      <Label>
                        Test MRP <span className="text-danger"></span>
                      </Label>
                      <Input
                        type="number"
                        name="mrp"
                        id="mrp"
                        placeholder="Enter Test MRP"
                        value={
                          payload?.itdose_offer_price_status
                            ? payload?.itdose_offer_price
                            : payload?.mrp
                        }
                        onChange={handleChange}
                        className="btn-outline-primary"
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label>
                        Test offer Price <span className="text-danger"></span>
                      </Label>
                      <Input
                        type="text"
                        name="offer_price"
                        id="offer_price"
                        placeholder="Enter Test Offer Price"
                        value={payload?.offer_price || ""}
                        onChange={handleChange}
                        className="btn-outline-primary"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label>
                    Speciality Name <span className="text-danger"></span>
                  </Label>
                  <Input
                    type="text"
                    name="specialityName"
                    id="specialityName"
                    placeholder="Enter Speciality Name"
                    value={payload?.specialityName || ""}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>

              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="report time">Report Time (In Hours)</Label>
                  <Input
                    type="text"
                    name="report"
                    id="report"
                    placeholder="Enter Report Name"
                    value={payload?.report || ""}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label>
                    No of Parameters <span className="text-danger"></span>
                  </Label>
                  <Input
                    type="text"
                    name="no_of_parameters"
                    id="no_of_parameters"
                    placeholder="Enter No of Parameters"
                    value={payload?.no_of_parameters || ""}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>

              <Col md="6" sm="12">
                <FormGroup>
                  <Label>
                    Test offer Price <span className="text-danger"></span>
                  </Label>
                  <Input
                    type="text"
                    name="offer_price"
                    id="offer_price"
                    placeholder="Enter Test Offer Price"
                    value={payload?.offer_price || ""}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="userName">
                    Select Package Type
                    <span className="text-danger"></span>
                  </Label>
                  <Input
                    type="select"
                    name="package_type"
                    id="package_type"
                    placeholder="Select Package"
                    value={payload?.package_type || ""}
                    onChange={handleChange}
                  >
                    <option value="">Select Package Type</option>
                    <option value="lab-test">Lab Test</option>
                    <option value="health-package">Health Package</option>
                  </Input>
                </FormGroup>
              </Col>
              <>
                <Col md="6" sm="12">
                  <FormGroup>
                    <Label>
                      Test Image
                      <span className="text-danger">
                        <sup>
                          <b>*</b>
                        </sup>
                      </span>
                    </Label>
                    <Input
                      type="file"
                      name="package_image"
                      id="package_image"
                      placeholder="Package image"
                      onChange={handleFile}
                    />
                    {imagePreview ? (
                      <div>
                        <span>Image Preview: </span>
                        <img
                          src={imagePreview}
                          style={{ height: "100px", width: "100px" }}
                        />
                        <span className="ml-1">
                          <Trash
                            size={20}
                            cursor="pointer"
                            className="text-danger"
                            onClick={() => {
                              setImagePreview("");
                              setPayload({
                                ...payload,
                                package_image: null,
                              });
                            }}
                          />
                        </span>
                      </div>
                    ) : null}
                  </FormGroup>
                </Col>
                <Col md="6" sm="12">
                  <FormGroup>
                    <Label for="package_image_altTag">
                      Test Image Alt{" "}
                      <span className="text-danger">
                        <sup>
                          <b>*</b>
                        </sup>
                      </span>
                    </Label>
                    <Input
                      type="text"
                      name="package_image_altTag"
                      id="package_image_altTag"
                      placeholder="Test Image Alt "
                      value={payload?.package_image_altTag}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
              </>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label>
                    Test Url <span className="text-danger"></span>
                  </Label>
                  <Input
                    type="text"
                    name="test_url"
                    id="test_url"
                    placeholder="Enter Test url"
                    value={payload?.test_url || ""}
                    onChange={handleChange}
                  />
                </FormGroup>
                {errorKeyName === "test_url" ? (
                  <span className="text-danger">
                    Test url must be greater or less then 24 ,exact 24 is not
                    valid
                  </span>
                ) : null}
              </Col>

              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="userName">
                    Test Review
                    <span className="text-danger"></span>
                  </Label>
                  <Input
                    type="number"
                    name="number_of_review"
                    id="number_of_review"
                    placeholder="Number of Review"
                    value={payload?.number_of_review || ""}
                    onChange={(e) => {
                      // if (Number(e.target.value)) {
                      handleChange(e);
                      // }
                    }}
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="number_of_star">
                    Star Test
                    <span className="text-danger"></span>
                  </Label>
                  <Input
                    type="number"
                    name="number_of_star"
                    id="number_of_star"
                    placeholder="Star Test"
                    value={payload?.number_of_star || ""}
                    onChange={(e) => {
                      if (
                        /^[0-5\s]*$/.test(e.target?.value) &&
                        e.target.value?.length <= 1
                      ) {
                        handleChange(e);
                      }
                    }}
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="collection_type">
                    Select Collection type
                    <span className="text-danger">
                      <sup>
                        <b>*</b>
                      </sup>
                    </span>
                  </Label>
                  <Input
                    type="select"
                    name="collection_type"
                    id="collection_type"
                    placeholder="Select Package"
                    value={payload?.collection_type}
                    onChange={handleChange}
                  >
                    <option value="">Select Collection type</option>
                    <option value="centre-visit">Centre visit</option>
                    <option value="home-collection">Home collection</option>
                  </Input>
                </FormGroup>
              </Col>
              {healthRisks?.data?.healthRiskData?.length !== 0 && (
                <Col md="6" sm="12">
                  <FormGroup>
                    <Label for="by_healthRisk">
                      Select Health Risk
                      <span className="text-danger">
                        <sup>
                          <b>*</b>
                        </sup>
                      </span>
                    </Label>
                    <AsyncSelect
                      isClearable={false}
                      theme={selectThemeColors}
                      isMulti
                      defaultOptions
                      value={payload?.by_healthRisk}
                      name="colors"
                      // loadOptions={loadOptions}
                      options={healthRisks?.data?.healthRiskData?.map(
                        (option) => {
                          return {
                            label: option.healthRiskTitle,
                            value: option._id,
                          };
                        }
                      )}
                      onChange={handleHealthRisk}
                      className="react-select z-3"
                      classNamePrefix="select"
                    />
                    {/* <Input
                    type="select"
                    name="by_healthRisk"
                    id="by_healthRisk"
                    placeholder="By HealthRisk"
                    value={payload?.by_healthRisk || ""}
                    onChange={handleChange}
                  >
                    <option value="">Select health risk</option>
                    {healthRisks?.data?.healthRiskData?.map((item) => {
                      return (
                        <option value={item?._id}>
                          {item?.healthRiskTitle}
                        </option>
                      );
                    })}
                  </Input> */}
                  </FormGroup>
                </Col>
              )}
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="userName">
                    Select Category
                    <span className="text-danger"></span>
                  </Label>
                  <Input
                    type="select"
                    name="cat_id"
                    id="cat_id"
                    placeholder="Select Category"
                    value={payload?.cat_id || ""}
                    onChange={handleChange}
                  >
                    <option value={""}>Select Any Category</option>
                    {categories?.data?.categoryData.map((it) => {
                    return <option value={it?._id}>{it?.category_name}</option>;
                  })}
                  </Input>
                  {/* {errorKeyName === 'cat_id' ? <span className='text-danger'>Category is Required</span> : null} */}
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label>
                    Also Known As<span className="text-danger"></span>
                  </Label>
                  <Input
                    type="text"
                    name="also_known_as"
                    id="also_known_as"
                    placeholder="Enter Also Known As"
                    value={payload?.also_known_as || ""}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label>
                    Test type <span className="text-danger"></span>
                  </Label>
                  <Input
                    type="text"
                    name="test_type"
                    id="test_type"
                    placeholder="Enter Test Type"
                    value={payload?.test_type || ""}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>

              {/* <Col md="6" sm="12">
                <FormGroup>
                  <Label>
                    Preparation<span className="text-danger"></span>
                  </Label>
                  <Input
                    type="text"
                    name="preparation"
                    id="preparation"
                    placeholder="Enter Preparation"
                    value={payload?.preparation || ""}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col> */}
              <Col md="6" sm="12">
                <FormGroup>
                  <Label>
                    Availablity<span className="text-danger"></span>
                  </Label>
                  <Input
                    type="text"
                    name="reporting"
                    id="reporting"
                    placeholder="Enter Availablity"
                    value={payload?.reporting || ""}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label>
                    Test Prize Info <span className="text-danger"></span>
                  </Label>
                  <Input
                    type="text"
                    name="test_price_info"
                    id="test_price_info"
                    placeholder="Enter Price Info"
                    value={payload?.test_price_info || ""}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label>
                    Related Test <span className="text-danger"></span>
                  </Label>
                  <Input
                    type="text"
                    name="related_tests"
                    id="related_tests"
                    placeholder="Enter Ralated Test"
                    value={payload?.related_tests || ""}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              {habits?.data?.hebitData?.length !== 0 && (
                <Col md="6" sm="12">
                  <FormGroup>
                    <Label>
                      Select Habits
                      <span className="text-danger"></span>
                    </Label>
                    <AsyncSelect
                      isClearable={false}
                      theme={selectThemeColors}
                      isMulti
                      defaultOptions
                      value={payload?.by_habits}
                      name="colors"
                      // loadOptions={loadOptions}
                      options={habits?.data?.hebitData?.map((option) => {
                        return {
                          label: option.hebitName,
                          value: option._id,
                        };
                      })}
                      onChange={handleSelectedValue}
                      className="react-select z-3"
                      classNamePrefix="select"
                    />
                    {/* <Input
                    type="select"
                    name="by_habits"
                    id="by_habits"
                    placeholder="Select Habits Type"
                    value={payload?.by_habits || ""}
                    onChange={handleChange}
                  >
                    <option value="">Select Habit Type</option>
                    {habits?.data?.hebitData.map((item, index) => (
                      <option value={item?._id} key={index}>
                        {item?.hebitName}
                      </option>
                    ))}
                  </Input> */}
                  </FormGroup>
                </Col>
              )}
              <Col md="6" sm="12">
                <FormGroup>
                  <Label>
                    Test Position <span className="text-danger"></span>
                  </Label>
                  <Input
                    type="text"
                    name="position"
                    id="position"
                    placeholder="Enter Test Position"
                    value={payload?.position || ""}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md="12" sm="12">
                <FormGroup>
                  <Label for="Information">
                    Information <span className="text-danger"></span>
                  </Label>
                  <EditorCom
                    dvalue={payload?.test_pre_test_info || ""}
                    getContent={getContent}
                    name="test_pre_test_info"
                  />
                </FormGroup>
              </Col>
              <Col md="12" sm="12">
                <FormGroup>
                  <Label for="Preparation">
                    Preparation <span className="text-danger"></span>
                  </Label>
                  <EditorCom
                    dvalue={payload?.preparation || ""}
                    getContent={getContent}
                    name="preparation"
                  />
                </FormGroup>
              </Col>
              <Col md="12" sm="12">
                <FormGroup>
                  <Label for="Components">
                    Components <span className="text-danger"></span>
                  </Label>
                  <EditorCom
                    dvalue={payload?.test_components || ""}
                    getContent={getContent}
                    name="test_components"
                  />
                </FormGroup>
              </Col>
              <Col md="12" sm="12">
                <FormGroup>
                  <Label for="metatagtile">
                    Meta Tag Title
                    <span className="text-danger"></span>
                  </Label>
                  <Input
                    type="text"
                    name="meta_title"
                    id="meta_title"
                    placeholder="Enter Meta Title"
                    value={payload?.meta_title || ""}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md="12" sm="12">
                <FormGroup>
                  <Label for="metatagdescription">
                    Meta Tag Description
                    <span className="text-danger"></span>
                  </Label>
                  <Input
                    type="text"
                    name="meta_desc"
                    id="meta_desc"
                    placeholder="Enter Meta Description"
                    value={payload?.meta_desc || ""}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md="12" sm="12">
                <FormGroup>
                  <Label for="metatagdescription">
                    Meta Tag Keywords
                    <span className="text-danger"></span>
                  </Label>
                  <Input
                    type="test"
                    name="meta_keyword"
                    id="meta_keyword"
                    placeholder="Enter Meta Keywords"
                    value={payload?.meta_keyword || ""}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>

              <Col sm="12">
                <FormGroup className="d-flex mb-0">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="mr-1"
                    color="primary"
                    onClick={handleSubmit}
                  >
                    {loading ? (
                      <Fragment>
                        <Spinner size="sm" />
                        <span className="ml-50">Loading...</span>
                      </Fragment>
                    ) : (
                      <span>Update Test</span>
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
export default memo(EditTest);
