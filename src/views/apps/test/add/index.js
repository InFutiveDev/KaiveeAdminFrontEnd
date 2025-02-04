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

import { ArrowLeft } from "react-feather";
import { useHistory } from "react-router-dom";

// ** redux hools and store
import { useDispatch, useSelector } from "react-redux";
import EditorCom from "../../../../@core/components/editor";
import { CheckObjectValidation } from "../../../../utility/Utils";
import {
  ADD_TEST_BY_ADMIN,
  GET_ALL_HABITS,
} from "../../../../redux/actions/test";
import { GET_ALL_CATEGORIES } from "../../../../redux/actions/category";
import { GET_ALL_HEALTH_RISKS } from "../../../../redux/actions/healthRisk";
import AsyncSelect from "react-select";
import { selectThemeColors } from "@utils";

const AddTest = () => {
  // ** redux hools and store
  const dispatch = useDispatch();
  // ** states
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const store = useSelector((state) => state);
  const {
    category,
    test,
    healthRisk: { healthRisks },
  } = store;
  const { categories } = category;
  const { habits } = test;

  const [errorKeyName, setErrorKeyName] = useState("");
  const [payload, setPayload] = useState({
    specialityName: "",
    test_name: "",
    report: "",
    no_of_parameters: "",
    cat_id: "",
    mrp: "",
    code: "",
    test_url: "",
    collection_type: "",
    package_type: "",
    reporting: "",
    itdose_code: null,
    itdose_code_status: false,
    itdose_department: null,
    itdose_department_status: false,
    itdose_offer_price: null,
    itdose_offer_price_status: false,
    itdose_test_name: null,
    itdose_test_name_status: false,
  });

  const getContent = (htmlContentProp, name) => {
    setPayload({ ...payload, [name]: htmlContentProp });
  };

  const handleFile = (e) => {
    const { name, files } = e.target;
    setPayload({ ...payload, [name]: files[0] });
  };

  const hanleInputBase = (e) => {
    const { name, value } = e.target;
    if (errorKeyName === name) {
      setErrorKeyName("");
    }
    if (name === "test_name") {
      setPayload({
        ...payload,
        // test_url: value.replaceAll(" ", "-"),
        [name]: value,
      });
    } else {
      setPayload({ ...payload, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    console.log("payload", payload);
    const { test_url, ...rest } = payload;
    const checkValidation = CheckObjectValidation({ test_url, ...rest }, [
      "code",
      "itdose_code",
      "itdose_code_status",
      "itdose_department",
      "itdose_department_status",
      "itdose_offer_price",
      "itdose_offer_price_status",
      "itdose_test_name",
      "itdose_test_name_status",
    ]);
    console.log("dfdf", checkValidation);
    setErrorKeyName(checkValidation.keyname);

    if (checkValidation.isvalid) {
      setLoading(true);
      const res = await dispatch(
        ADD_TEST_BY_ADMIN({
          ...payload,
          by_healthRisk: payload?.by_healthRisk
            ?.map((item) => item.value)
            ?.join(","),
          by_habits: payload?.by_habits?.map((item) => item.value)?.join(","),
        })
      );
      if (res?.success) {
        history.push("/apps/test/all");
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
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
    dispatch(GET_ALL_HEALTH_RISKS(1, "", 50));
    dispatch(GET_ALL_HABITS());
  }, []);

  return (
    <div>
      <Card>
        <CardHeader className="w-100">
          <div className="w-100 d-flex align-items-center justify-content-between">
            <h4>Add Test</h4>
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
                <Label>
                  Test Code <span className="text-danger"></span>
                </Label>
                <Input
                  type="text"
                  name="code"
                  id="code"
                  placeholder="Enter Test Code"
                  // disabled
                  value={payload?.code || ""}
                  onChange={hanleInputBase}
                  className="btn-outline-primary"
                />
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="name">
                  Test Name{" "}
                  <span className="text-danger">
                    <sup>
                      <b>*</b>
                    </sup>
                  </span>
                </Label>
                <Input
                  type="text"
                  name="test_name"
                  id="test_name"
                  placeholder="Enter Test Name"
                  value={payload?.test_name}
                  onChange={hanleInputBase}
                  className="btn-outline-primary"
                />
                {errorKeyName === "test_name" ? (
                  <span className="text-danger">Test Name is Required</span>
                ) : null}
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="name">
                  Department<span className="text-danger"></span>
                </Label>
                <Input
                  type="text"
                  name="department"
                  id="department"
                  placeholder="Enter Deparment"
                  value={payload?.department}
                  onChange={hanleInputBase}
                  className="btn-outline-primary"
                />
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="name">
                  Test MRP{" "}
                  <span className="text-danger">
                    <sup>
                      <b>*</b>
                    </sup>
                  </span>
                </Label>
                <Input
                  type="number"
                  name="mrp"
                  id="mrp"
                  placeholder="Enter Test MRP"
                  value={payload?.mrp}
                  onChange={hanleInputBase}
                  className="btn-outline-primary"
                />
                {errorKeyName === "mrp" ? (
                  <span className="text-danger">Test MRP is Required</span>
                ) : null}
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="specialityName">
                  Speciality Name{" "}
                  <span className="text-danger">
                    <sup>
                      <b>*</b>
                    </sup>
                  </span>
                </Label>
                <Input
                  type="text"
                  name="specialityName"
                  id="specialityName"
                  placeholder="Enter Speciality Name"
                  value={payload?.specialityName}
                  onChange={hanleInputBase}
                />
                {errorKeyName === "specialityName" ? (
                  <span className="text-danger">
                    Speciality Name is Required
                  </span>
                ) : null}
              </FormGroup>
            </Col>

            <Col md="6" sm="12">
              <FormGroup>
                <Label for="report time">
                  Report Time (In Hours){" "}
                  <span className="text-danger">
                    <sup>
                      <b>*</b>
                    </sup>
                  </span>
                </Label>
                <Input
                  type="text"
                  name="report"
                  id="report"
                  placeholder="Enter Report Time"
                  value={payload?.report}
                  onChange={hanleInputBase}
                />
                {errorKeyName === "report" ? (
                  <span className="text-danger">Report Time is Required</span>
                ) : null}
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="name">
                  No of Parameters{" "}
                  <span className="text-danger">
                    <sup>
                      <b>*</b>
                    </sup>
                  </span>
                </Label>
                <Input
                  type="number"
                  name="no_of_parameters"
                  id="no_of_parameters"
                  placeholder="Enter No of Parameters"
                  value={payload?.no_of_parameters}
                  onChange={hanleInputBase}
                />
                {errorKeyName === "no_of_parameters" ? (
                  <span className="text-danger">Parameters is Required</span>
                ) : null}
              </FormGroup>
            </Col>

            <Col md="6" sm="12">
              <FormGroup>
                <Label for="offer_price">
                  Test offer Price <span className="text-danger" />
                </Label>
                <Input
                  type="text"
                  name="offer_price"
                  id="offer_price"
                  placeholder="Enter Test Offer Price"
                  value={payload?.offer_price}
                  onChange={hanleInputBase}
                />
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="test_url">
                  Test Url <span className="text-danger" />
                </Label>
                <Input
                  type="text"
                  name="test_url"
                  id="test_url"
                  placeholder="Enter Test Url "
                  value={payload?.test_url}
                  onChange={hanleInputBase}
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
                  onChange={hanleInputBase}
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
                  placeholder="Number of Review"
                  value={payload?.number_of_star || ""}
                  onChange={(e) => {
                    if (
                      /^[0-5\s]*$/.test(e.target?.value) &&
                      e.target.value?.length <= 1
                    ) {
                      hanleInputBase(e);
                    }
                  }}
                />
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="package_type">
                  Select Package Type
                  <span className="text-danger">
                    <sup>
                      <b>*</b>
                    </sup>
                  </span>
                </Label>
                <Input
                  type="select"
                  name="package_type"
                  id="package_type"
                  placeholder="Select Package"
                  value={payload?.package_type}
                  onChange={hanleInputBase}
                >
                  <option value="">Select Package Type</option>
                  <option value="lab-test">Lab Test</option>
                  <option value="health-package">Health Package</option>
                </Input>
                {errorKeyName === "package_type" ? (
                  <span className="text-danger">Package Type is Required</span>
                ) : null}
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
                  {payload?.package_image ? (
                    <div>
                      <span>Image Preview: </span>
                      <img
                        src={URL.createObjectURL(payload?.package_image)}
                        style={{ height: "100px", width: "100px" }}
                      />
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
                    onChange={hanleInputBase}
                  />
                </FormGroup>
              </Col>
            </>
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
                  onChange={hanleInputBase}
                >
                  <option value="">Select Collection type</option>
                  <option value="centre-visit">Centre visit</option>
                  <option value="home-collection">Home collection</option>
                </Input>
                {errorKeyName === "collection_type" ? (
                  <span className="text-danger">
                    Collection Type is Required
                  </span>
                ) : null}
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
                    name="colors"
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

                  {errorKeyName === "by_healthRisk" ? (
                    <span className="text-danger">health risk is Required</span>
                  ) : null}
                </FormGroup>
              </Col>
            )}
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="category">
                  Select Category
                  <span className="text-danger">
                    <sup>
                      <b>*</b>
                    </sup>
                  </span>
                </Label>
                <Input
                  type="select"
                  name="cat_id"
                  id="cat_id"
                  placeholder="Select Category"
                  value={payload?.cat_id}
                  onChange={hanleInputBase}
                >
                  {!payload.cat_id ? (
                    <option value="">Select Any Category</option>
                  ) : null}
                  {categories?.data?.categoryData.map((option) => (
                    <option key={option._id} value={option._id}>
                      {option?.category_name}
                    </option>
                  ))}
                </Input>
                {errorKeyName === "cat_id" ? (
                  <span className="text-danger">Category is Required</span>
                ) : null}
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="also_known_as">
                  Also Known As<span className="text-danger"></span>
                </Label>
                <Input
                  type="text"
                  name="also_known_as"
                  id="also_known_as"
                  placeholder="Enter Also Known As"
                  value={payload?.also_known_as}
                  onChange={hanleInputBase}
                />
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="test_type">
                  Test type <span className="text-danger"></span>
                </Label>
                <Input
                  type="text"
                  name="test_type"
                  id="test_type"
                  placeholder="Enter Test Type"
                  value={payload?.test_type}
                  onChange={hanleInputBase}
                />
                {errorKeyName === "test_type" ? (
                  <span className="text-danger">Test Type is Required</span>
                ) : null}
              </FormGroup>
            </Col>

            {/* <Col md="6" sm="12">
              <FormGroup>
                <Label for="name">
                  Preparation<span className="text-danger"></span>
                </Label>
                <Input
                  type="text"
                  name="preparation"
                  id="preparation"
                  placeholder="Enter Preparation"
                  value={payload?.preparation}
                  onChange={hanleInputBase}
                />
              </FormGroup>
            </Col> */}
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="name">
                  Availablity<span className="text-danger"></span>
                </Label>
                <Input
                  type="text"
                  name="reporting"
                  id="reporting"
                  placeholder="Enter Availablity"
                  value={payload?.reporting}
                  onChange={hanleInputBase}
                />
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="name">
                  Test Price Info <span className="text-danger"></span>
                </Label>
                <Input
                  type="text"
                  name="test_price_info"
                  id="test_price_info"
                  placeholder="Enter Price Info"
                  value={payload?.test_price_info}
                  onChange={hanleInputBase}
                />
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="name">
                  Related Test <span className="text-danger"></span>
                </Label>
                <Input
                  type="text"
                  name="related_tests"
                  id="related_tests"
                  placeholder="Enter Ralated Test"
                  value={payload?.related_tests}
                  onChange={hanleInputBase}
                />
              </FormGroup>
            </Col>
            {habits?.data?.hebitData?.length !== 0 && (
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="by_habits">
                    Select Cause
                    <span className="text-danger"></span>
                  </Label>
                  <AsyncSelect
                    isClearable={false}
                    theme={selectThemeColors}
                    isMulti
                    defaultOptions
                    name="colors"
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
                </FormGroup>
              </Col>
            )}
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="name">
                  Test Position <span className="text-danger"></span>
                </Label>
                <Input
                  type="text"
                  name="position"
                  id="position"
                  placeholder="Enter Test Position"
                  value={payload?.position}
                  onChange={hanleInputBase}
                />
              </FormGroup>
            </Col>
            <Col md="12" sm="12">
              <FormGroup>
                <Label for="Description">
                  Information <span className="text-danger"></span>
                </Label>
                <EditorCom getContent={getContent} name="test_pre_test_info" />
              </FormGroup>
            </Col>
            <Col md="12" sm="12">
              <FormGroup>
                <Label for="Preparation">
                  Preparation <span className="text-danger"></span>
                </Label>
                <EditorCom getContent={getContent} name="preparation" />
              </FormGroup>
            </Col>
            <Col md="12" sm="12">
              <FormGroup>
                <Label for="Description">
                  Components <span className="text-danger"></span>
                </Label>
                <EditorCom getContent={getContent} name="test_components" />
              </FormGroup>
            </Col>
            <Col md="12" sm="12">
              <FormGroup>
                <Label for="meta_title">
                  Meta Tag Title
                  <span className="text-danger"></span>
                </Label>
                <Input
                  type="text"
                  name="meta_title"
                  id="meta_title"
                  placeholder="Enter Meta Title"
                  value={payload?.meta_title}
                  onChange={hanleInputBase}
                />
                {errorKeyName === "meta_title" ? (
                  <span className="text-danger">Meta Title is Required</span>
                ) : null}
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
                  value={payload?.meta_desc}
                  onChange={hanleInputBase}
                />
                {errorKeyName === "meta_desc" ? (
                  <span className="text-danger">
                    Meta Description is Required
                  </span>
                ) : null}
              </FormGroup>
            </Col>
            <Col md="12" sm="12">
              <FormGroup>
                <Label for="metatagdescription">
                  Meta Tag Keywords
                  <span className="text-danger"></span>
                </Label>
                <Input
                  type="text"
                  name="meta_keyword"
                  id="meta_keyword"
                  placeholder="Enter Meta Keywords"
                  value={payload?.meta_tag_keyword}
                  onChange={hanleInputBase}
                />
                {errorKeyName === "meta_tag_keyword" ? (
                  <span className="text-danger">Meta Keyword is Required</span>
                ) : null}
              </FormGroup>
            </Col>

            <Col sm="12">
              <FormGroup className="d-flex mb-0">
                <Button
                  type="submit"
                  disabled={loading}
                  onClick={handleSubmit}
                  className="mr-1"
                  color="primary"
                >
                  {loading ? (
                    <Fragment>
                      <Spinner size="sm" />
                      <span className="ml-50">Loading...</span>
                    </Fragment>
                  ) : (
                    <span>Add Test</span>
                  )}
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};
export default memo(AddTest);
